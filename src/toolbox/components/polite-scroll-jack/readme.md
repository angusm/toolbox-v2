Allow for scroll-jack/slide-show like behaviour without removing the control from the user.

Create a position-relative container div at a height that should be scrolled to transition through all "slides" of the scroll-jacked content.
Option to auto-size this based on total "slide" height.

Inside the container div add a 100vh sticky slide container. Have that container
use a Toolbox Carousel.

Based on the percent of the container scrolled, activate the appropriate slide.
Based on changes to the carousel, adjust the scroll.

Carousel active classes and transitions can be used for different motion.
