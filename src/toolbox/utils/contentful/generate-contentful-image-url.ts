import { Browser } from '../user-agent/browser/base';
import { UserAgent } from '../user-agent/user-agent';
import { isWebpSupported } from '../user-agent/feature-support/is-webp-supported';

function generateContentfulImageUrl(rawImageUrl: string): string {
  if (isWebpSupported(UserAgent.getBrowser())) {
    return `${rawImageUrl}?fm=webp`;
  } else {
    return rawImageUrl;
  }
}

export { generateContentfulImageUrl };
