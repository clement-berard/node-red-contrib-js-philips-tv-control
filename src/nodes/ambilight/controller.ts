import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import { getPhilipsTvCore } from '../philips-tv-config/utils';
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

    const matchers = {
      set_brightness: {
        call: () => tvClient.changeAmbilightBrightness(innerValue),
      },
      set_video_mode: {
        call: () => tvClient.setAmbilightFollowVideoMode(innerValue),
      },
    };

    const matcher = matchers[currentAction];

    await matcher.call();

    const nextPayload = {
      value: innerValue,
      action: currentAction,
    };

    if (returnInfo) {
      const [, info] = await tvClient.getAmbilightFullInformation();
      nextPayload['info'] = info;
    }

    this.send({
      ...msg,
      payload: nextPayload,
    });
  });
}
