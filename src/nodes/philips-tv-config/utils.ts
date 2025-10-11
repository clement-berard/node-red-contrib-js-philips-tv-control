import type { NodeAPI } from 'node-red';
import { getTvApi } from '../../common/httpClient';
import type { TVConfig } from './types';

export function getPhilipsTvCore(RED: NodeAPI, tvNodeId: string) {
  const tvConfig = RED.nodes.getNode(tvNodeId) as unknown as TVConfig;

  const tvClient = getTvApi({
    url: tvConfig.url,
    // @ts-expect-error
    digest_user: tvConfig.credentials.digest_user,
    // @ts-expect-error
    digest_password: tvConfig.credentials.digest_password,
  });

  return {
    tvClient,
    tvConfig,
  };
}
