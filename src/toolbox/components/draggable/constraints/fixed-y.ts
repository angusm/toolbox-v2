const BaseConstraint = require('./base');
const Vector2d = require('../../../utils/math/geometry/vector-2d');

class FixedYConstraint extends BaseConstraint {
  constrainDelta(draggable, delta) {
    return new Vector2d(delta.x, 0);
  }
}

module.exports = FixedYConstraint;
