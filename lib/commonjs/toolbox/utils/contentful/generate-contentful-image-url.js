"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_agent_1 = require("../user-agent/user-agent");
var is_webp_supported_1 = require("../user-agent/feature-support/is-webp-supported");
function generateContentfulImageUrl(rawImageUrl) {
    if (is_webp_supported_1.isWebpSupported(user_agent_1.UserAgent.getBrowser())) {
        return rawImageUrl + "?fm=webp";
    }
    else {
        return rawImageUrl;
    }
}
exports.generateContentfulImageUrl = generateContentfulImageUrl;
//# sourceMappingURL=generate-contentful-image-url.js.map