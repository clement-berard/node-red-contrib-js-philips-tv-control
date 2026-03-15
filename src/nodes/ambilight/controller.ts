import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { AmbilightBrightnessChoices, AmbilightFollowAudioMode, AmbilightFollowVideoMode } from 'philtv-js';
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

    const [error] = validate(innerPayload, payloadSchema);

    if (error) {
      this.error(`Validation failed: ${error.message}`, msg);
      return;
    }

    const matchers = {
      set_brightness: {
        call: async () => tvClient.ambilight.setBrightness(Number(innerPayload.value) as AmbilightBrightnessChoices),
      },
      decrease_brightness: {
        call: async () => tvClient.ambilight.decreaseBrightness(),
      },
      increase_brightness: {
        call: async () => tvClient.ambilight.increaseBrightness(),
      },
      set_video_mode: {
        call: () => tvClient.ambilight.setFollowVideoMode(innerPayload.value as AmbilightFollowVideoMode),
      },
      set_audio_mode: {
        call: () => tvClient.ambilight.setFollowAudioMode(innerPayload.value as AmbilightFollowAudioMode),
      },
    };

    const matcher = matchers[innerPayload.action];

    try {
      await matcher.call();
    } catch (e) {
      this.error(`Error: ${e.message}`, msg);

      return;
    }

    if (innerPayload.returnInfo) {
      try {
        // @ts-expect-error
        innerPayload.info = await tvClient.ambilight.getFullInformation();
      } catch (e) {
        this.error(`Error: ${e.message}`, msg);

        return;
      }
    }

    this.send({
      ...msg,
      payload: innerPayload,
    });
  });
}
