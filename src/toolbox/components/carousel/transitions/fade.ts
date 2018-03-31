const Transition = require('./base');
const getOpacity = require('../../../utils/dom/style/get-opacity');
const renderLoop = require('../../../utils/render-loop');

class Fade extends Transition {
    constructor(step = 0.1) {
        super();
        this.step_ = step;
    }

    init(targetSlide, carousel) {
        renderLoop.mutate(() => {
            carousel.getSlides().forEach((slide) => slide.style.opacity = 0);
            targetSlide.style.opacity = 1;
        });
    }

    transition(targetSlide, carousel) {
        const slidesToFade =
            carousel.getSlides().filter((slide) => slide !== targetSlide);
        renderLoop.measure(() => {
            const opacity = getOpacity(targetSlide) + this.step_;
            renderLoop.mutate(
                () => targetSlide.style.opacity = Math.min(1, opacity));
            slidesToFade.forEach((slide) => {
                const opacity = getOpacity(slide) - this.step_;
                renderLoop.mutate(
                    () => slide.style.opacity = Math.max(0, opacity));
            });
        });
    }
}

module.exports = Fade;