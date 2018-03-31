class Constraint {
  constrainDelta(draggable, delta) {
    console.warn('constrainDelta is not overridden from base case');
    return delta;
  }
}

module.exports = Constraint;
