import { Browser } from '../user-agent/browser/base';
import { UserAgent } from '../user-agent/user-agent';

function generateContentfulImageUrl(rawImageUrl: string): string {
  if (UserAgent.getBrowser().isWebpSupported()) {
    return `${rawImageUrl}?fm=webp`;
  } else {
    return rawImageUrl;
  }
}

export { generateContentfulImageUrl };
