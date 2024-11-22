import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import * as superstruct from 'superstruct';
import { validate } from 'superstruct';
import { getPhilipsTvCore } from '../philips-tv-config/utils';
import { actionsDefinition } from './node-config';
import type { NodeAmbilightProps } from './types';

export default function (
  this: NodeControllerInst<NodeAmbilightProps>,
  config: NodeControllerConfig<NodeAmbilightProps>,
) {
  RED.nodes.createNode(this, config);
  const { tvClient } = getPhilipsTvCore(RED, config.tv);
  this.on('input', async (msg) => {
    const currentAction = config.action;
    const innerValue = config.value;
    const returnInfo = config.returnInfo;

    let innerPayload = {
      value: innerValue,
      action: currentAction,
      returnInfo,
    };

    if (msg.payload) {
      innerPayload = msg.payload as unknown as any;
    }

    const payloadSchema = superstruct.object({
      action: superstruct.enums(actionsDefinition.map((action) => action.value)),
      value: superstruct.union([superstruct.string(), superstruct.number()]),
      returnInfo: superstruct.optional(superstruct.boolean()),
    });

    console.log('innerPayload', innerPayload);
    const [error, value] = validate(innerPayload, payloadSchema);

    if (error) {
      this.error(`Validation failed: ${error.message}`);
      return;
    }

    const matchers = {
      set_brightness: {
        call: () => tvClient.changeAmbilightBrightness(innerPayload.value as any),
      },
      set_video_mode: {
        call: () => tvClient.setAmbilightFollowVideoMode(innerPayload.value),
      },
    };

    const matcher = matchers[innerPayload.action];

    const [callError] = await matcher.call();

    if (callError) {
      this.error(`Error: ${callError.message}`);
      return;
    }

    if (innerPayload.returnInfo) {
      const [, info] = await tvClient.getAmbilightFullInformation();
      // @ts-ignore
      innerPayload.info = info;
    }

    this.send({
      ...msg,
      payload: innerPayload,
    });
  });
}
