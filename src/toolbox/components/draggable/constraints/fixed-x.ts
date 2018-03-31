const BaseConstraint = require('./base');
const Vector2d = require('../../../utils/math/geometry/vector-2d');

class FixedXConstraint extends BaseConstraint {
  constrainDelta(draggable, delta) {
    return new Vector2d(0, delta.y);
  }
}

module.exports = FixedXConstraint;
