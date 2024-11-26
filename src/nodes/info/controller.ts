import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { NodeMessageInFlow } from 'node-red';
import { enums, validate } from 'superstruct';
import { getPhilipsTvCore } from '../philips-tv-config/utils';
import pckNodeConfig from './node-config';
import type { InfoNodeProps } from './types';

export default function (this: NodeControllerInst<InfoNodeProps>, config: NodeControllerConfig<InfoNodeProps>) {
  RED.nodes.createNode(this, config);
  const { tvClient } = getPhilipsTvCore(RED, config.tv);
  const actionHandlers = Object.freeze({
    tv_ambilight_info: () => tvClient.getAmbilightFullInformation(),
    tv_system: () => tvClient.getSystem(),
    tv_structure: () => tvClient.getMenuStructure({ flat: true }),
  });

  let action = config.kind;

  const ActionSchema = enums(pckNodeConfig.getAvailableKinds());

  const validatePayload = (payload: unknown): [boolean, string | null] => {
    const [error, value] = validate(payload, ActionSchema);
    return error ? [false, error.message] : [true, value];
  };

  const executeAction = async (action: string, initialMessage: NodeMessageInFlow) => {
    try {
      const [err, data] = await actionHandlers[action]();
      if (err) {
        this.error(err.message, initialMessage);
      } else {
        this.send({ ...initialMessage, payload: data });
      }
    } catch (unexpectedError) {
      this.error(`Unexpected error: ${unexpectedError.message}`, initialMessage);
    }
  };

  this.on('input', async (msg) => {
    if (action === '' && msg.payload) {
      const [isValid, validationError] = validatePayload(msg.payload);

      if (!isValid) {
        this.error(`Validation failed: ${validationError}`, msg);
        return;
      }

      action = msg.payload as string;
    }

    await executeAction(action, msg);
  });
}
