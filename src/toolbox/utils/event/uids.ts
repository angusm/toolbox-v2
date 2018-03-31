const DynamicDefaultMap = require('../../map/dynamic-default');

let uid_ = 0;
const uids =
  DynamicDefaultMap.usingFunction((eventType) => `CustomEvent_${uid_++}`);

module.exports = uids;