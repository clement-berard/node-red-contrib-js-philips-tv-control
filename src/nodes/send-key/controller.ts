import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { InputKeys } from 'philtv-js';
import { enums, validate } from 'superstruct';
import { getPhilipsTvCore } from '../philips-tv-config/utils';
import { inputKeys } from './node-config';
import type { NodeSendKeyProps } from './types';

export default function (this: NodeControllerInst<NodeSendKeyProps>, config: NodeControllerConfig<NodeSendKeyProps>) {
  RED.nodes.createNode(this, config);
  const { tvClient } = getPhilipsTvCore(RED, config.tv);
  this.on('input', async (msg) => {
    const currentPayload = msg.payload as InputKeys;
    const configKey = config.key as InputKeys;

    const realCommand = configKey || currentPayload;
    const keySchema = enums(inputKeys);
    const [error, value] = validate(msg.payload, keySchema);
    if (error) {
      this.error(`Validation failed: ${error.message}`);
      return;
    }

    await tvClient.sendKey(realCommand);

    this.send({
      ...msg,
      payload: realCommand,
    });
  });
}
