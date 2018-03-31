class Transition {
    constructor() {}

    transition(targetSlide, carousel) {
        console.error('Child class should override');
    }

    init(initialSlide, carousel) {
        console.error('Child class should override, defaulting to transition');
        this.transition(initialSlide, carousel);
    }
}

module.exports = Transition;