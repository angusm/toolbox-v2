import { UserAgent } from '../user-agent/user-agent';
function generateContentfulImageUrl(rawImageUrl) {
    if (UserAgent.getBrowser().isWebpSupported()) {
        return rawImageUrl + "?fm=webp";
    }
    else {
        return rawImageUrl;
    }
}
export { generateContentfulImageUrl };
//# sourceMappingURL=generate-contentful-image-url.js.map