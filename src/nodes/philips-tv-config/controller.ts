import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { TVConfig } from './types';

export const credentials = {
  digest_user: { type: 'text' },
  digest_password: { type: 'password' },
};

export default function (this: NodeControllerInst<TVConfig>, config: NodeControllerConfig<TVConfig>) {
  RED.nodes.createNode(this, config);
  this.name = config.name;
  this.url = config.url;
}
