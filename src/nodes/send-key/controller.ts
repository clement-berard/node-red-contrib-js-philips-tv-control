import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { InputKey } from 'philtv-js';
import { inputKeys } from 'philtv-js/constants';
import { enums, validate } from 'superstruct';
import { getPhilipsTvCore } from '../philips-tv-config/utils';
import type { NodeSendKeyProps } from './types';

export default function (this: NodeControllerInst<NodeSendKeyProps>, config: NodeControllerConfig<NodeSendKeyProps>) {
  RED.nodes.createNode(this, config);
  const { tvClient } = getPhilipsTvCore(RED, config.tv);
  this.on('input', async (msg) => {
    const currentPayload = msg.payload as InputKey;
    const configKey = config.key as InputKey;

    const realCommand = currentPayload || configKey;
    const keySchema = enums(inputKeys);
    const [error] = validate(realCommand, keySchema);
    if (error) {
      this.error(`Validation failed: ${error.message}`, msg);
      return;
    }

    try {
      await tvClient.input.sendKey(realCommand);
    } catch (err) {
      this.error(err.message, msg);

      return;
    }

    this.send({
      ...msg,
      payload: realCommand,
    });
  });
}
