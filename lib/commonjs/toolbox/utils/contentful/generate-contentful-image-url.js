"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_agent_1 = require("../user-agent/user-agent");
function generateContentfulImageUrl(rawImageUrl) {
    if (user_agent_1.UserAgent.getBrowser().isWebpSupported()) {
        return rawImageUrl + "?fm=webp";
    }
    else {
        return rawImageUrl;
    }
}
exports.generateContentfulImageUrl = generateContentfulImageUrl;
//# sourceMappingURL=generate-contentful-image-url.js.map