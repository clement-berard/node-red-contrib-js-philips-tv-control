import { PhilTVApi } from 'philtv-js';
import type { TVConfig } from '../nodes/philips-tv-config/types';

export function getTvApi(config: TVConfig) {
  return new PhilTVApi({
    apiUrl: config.url,
    user: config.digest_user,
    password: config.digest_password,
  });
}
