import { CommonSelector } from "../common-selector";
function getAnchorsWithCommonSelector() {
    return Array.from(document.querySelectorAll(CommonSelector.DEEP_LINK_TARGETS));
}
export { getAnchorsWithCommonSelector };
//# sourceMappingURL=get-anchors-with-common-selector.js.map