import { UserAgent } from '../user-agent/user-agent';
import { isWebpSupported } from '../user-agent/feature-support/is-webp-supported';
function generateContentfulImageUrl(rawImageUrl) {
    if (isWebpSupported(UserAgent.getBrowser())) {
        return rawImageUrl + "?fm=webp";
    }
    else {
        return rawImageUrl;
    }
}
export { generateContentfulImageUrl };
//# sourceMappingURL=generate-contentful-image-url.js.map