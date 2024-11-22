import { PhilTVApi } from 'philtv-js';
import type { TVConfig } from '../nodes/philips-tv-config/types';

type GetTvApiParams = Omit<TVConfig, 'name' | 'ip'>;

export function getTvApi(config: GetTvApiParams) {
  return new PhilTVApi({
    apiUrl: config.url,
    user: config.digest_user,
    password: config.digest_password,
  });
}
