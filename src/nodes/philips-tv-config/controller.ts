import type { NodeControllerConfig, NodeControllerInst } from '@keload/node-red-dxp/editor';
import type { TVConfig } from './types';

export default function (this: NodeControllerInst<TVConfig>, config: NodeControllerConfig<TVConfig>) {
  RED.nodes.createNode(this, config);
  this.name = config.name;
  this.url = config.url;
  this.digest_user = config.digest_user;
  this.digest_password = config.digest_password;
}
