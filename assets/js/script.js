'use strict';


/*ADD Event listener on multiple elements*/

const addEventOnElements = function(elements, eventType, callback) {
    for (let i=0, len=elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

/*NAVBAR TOGGLE FOR MOBILE */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


/**HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    if (this.window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
})

/**SLIDER */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {
    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let currentSlidePos = 0;

    const moveSliderItem = function() {
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    const slideNext = function () {
        const slideEnd = currentSlidePos >= sliderContainer.children.length - 1;

        if (slideEnd) {
            currentSlidePos = 0;
        } else {
            currentSlidePos++;
        }

        moveSliderItem();
    }
    sliderNextBtn.addEventListener("click", slideNext);

    const slidePrev = function () {
        const slideStart = currentSlidePos <= 0;

        if (slideStart) {
            currentSlidePos = sliderContainer.children.length - 1;
        } else {
            currentSlidePos--;
        }

        moveSliderItem();
    }
    sliderPrevBtn.addEventListener("click", slidePrev);

    // Hide buttons if there are not enough slides
    const hideButtonsIfNeeded = function() {
        if (sliderContainer.children.length <= 1) {
            sliderNextBtn.style.display = "none";
            sliderPrevBtn.style.display = "none";
        }
    }

    // Initial setup
    moveSliderItem();
    hideButtonsIfNeeded();
}

for (let i = 0, len = sliders.length; i < len; i++) {
    initSlider(sliders[i]);
}

/**ACCORDION ABOUT SECTION */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = null;

const initAccordion = function (currentAccordion) {
    const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");
    
    const expandAccordion = function () {
        if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
            lastActiveAccordion.classList.remove("expanded");
        }

        currentAccordion.classList.toggle("expanded");

        lastActiveAccordion = currentAccordion.classList.contains("expanded") ? currentAccordion : null;
    }

    accordionBtn.addEventListener("click", expandAccordion);
}

for (let i = 0, len = accordions.length; i < len; i++) {
    initAccordion(accordions[i]);
}

/**COUNTDOWN ANIMATION FOR STATS */

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".card-text .h1");

    const animateCounter = (element, target) => {
        let count = 0;
        const speed = 100; // Adjust speed to control the counting speed

        const updateCounter = () => {
            if (count < target) {
                count += Math.ceil(target / speed);
                if (count > target) count = target;
                element.textContent = count;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const handleScroll = () => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

            if (isVisible && !counter.classList.contains("counted")) {
                const target = parseInt(counter.getAttribute("data-target"), 10);
                animateCounter(counter, target);
                counter.classList.add("counted");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger check on initial load
});