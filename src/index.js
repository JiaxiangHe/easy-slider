import { timingSafeEqual } from "crypto";

function log(type = 'log', ...info) {
    if (this.config.debug) {
        console[type](info);
    }
}

/**
 * @const ATTRIBUTES
 * @description Collection of constant values for related data attributes of the module
 * @type {{CONTROLS: string, EXPANDED: string, HIDDEN: string}}
 */
const CLASSES = {
    CAROUSEL_WRAPPER: 'simple-carousel__wrapper',
    CAROUSEL_ITEM: 'simple-carousel__item',
    CAROUSEL_PAGINATION: 'simple-carousel__pagination'
};

export default class SimpleCarousel {
    constructor(selector = '.simple-carousel', config = {
        initialSlide: 0,
        debug: false,
        loop: false,
        effect: 'slide'
    }) {
        // parent element
        this.element = document.querySelector(selector);

        // properties
        this.config = config; // config
        this.currentIndex = this.config.initialSlide;
        this.total = null;
        this.slideWidth = null;

        // class
        this.elementStyle = window.getComputedStyle(this.element, null);
        this.wrapperStyle = null;

        // node
        this.wrapper = null;
        this.slides = null;
        this.pagination = null;
        this.next = null;
        this.prev = null;

        if (this.element) {
            this.init();
        } else {
            log.call(this, 'error', `wrong selector: '${selector}'`);
        }
    }

    init() {
        // cacheDom
        this.cacheDom();

        // prepare properties
        this.total = this.slides.length;
        this.slideWidth = this.element.clientWidth
            - parseFloat(this.elementStyle.getPropertyValue('padding-left'))
            - parseFloat(this.elementStyle.getPropertyValue('padding-right'));

        // init nodes
        switch (this.config.effect) {
            case 'slide':
            default:
                this.wrapper.style.transform = 'translateX(0px)';
                break;
        }
        this.slides.forEach((item) => {
            item.style.width = `${this.slideWidth}px`;
        });

        // bindEvent
        this.bindEvent();
    }

    goTo(index) {
        const nextIndex = this.config.loop ? index + this.total % this.total : Math.max(Math.min(index, this.total - 1), 0);
        console.log(nextIndex);
        switch (this.config.effect) {
            case 'slide':
            default:
                this.wrapper.style.transform = `translateX(-${this.slideWidth * nextIndex}px)`;
                break;
        }
        this.currentIndex = nextIndex;
    }

    nextSlide() {
        this.goTo(this.currentIndex + 1);
    }

    prevSlide() {
        this.goTo(this.currentIndex - 1);
    }

    cacheDom() {
        this.wrapper = this.element.querySelector(`.${CLASSES.CAROUSEL_WRAPPER}`);
        this.slides = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_ITEM}`));
        this.pagination = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_PAGINATION}`));
        this.next = null;
        this.prev = null;
    }

    bindEvent() {
        // this.wrapper.addEventListener('click', () => { this.nextSlide() });
        this.element.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];

            this.wrapper.style.transitionDuration = '0s';

            this.isTouching = true;
            this.startTime = new Date().getTime();
            this.xCoordinate = touch.clientX;
            this.yCoordinate = touch.clientY;
        });
        this.element.addEventListener('touchmove', (event) => {
            if (!this.xCoordinate && !this.yCoordinate) {
                return;
            }

            const touch = event.touches[0];
            const xDiff = this.xCoordinate - touch.clientX;
            const yDiff = this.yCoordinate - touch.clientY;

            this.newXCoordinate = touch.clientX;
            this.newYCoordinate = touch.clientY;

            this.wrapper.style.transform = `translateX(${-this.slideWidth * this.currentIndex - xDiff}px)`;
        });
        this.element.addEventListener('touchend', (event) => {
            const tDiff = new Date().getTime() - this.startTime;
            const xDiff = this.xCoordinate - this.newXCoordinate;

            this.isTouching = false;
            this.startTime = null;
            this.xCoordinate = null;
            this.yCoordinate = null;
            this.newXCoordinate = null;
            this.newYCoordinate = null;

            this.wrapper.style.transitionDuration = '.3s';
            if (Math.abs(xDiff) / this.slideWidth > 0.4 || (Math.abs(xDiff) > 50 && tDiff < 300)) {
                this.goTo(this.currentIndex + (xDiff > 0 ? 1 : -1));
            } else {
                this.wrapper.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
            }
        });

        if (screen.width > 768) {
            this.element.addEventListener('mouseenter', () => {
                this.mouseIn = true;
            });
            this.element.addEventListener('mouseleave', () => {
                this.mouseIn = false;
            });
            window.addEventListener('mousedown', (event) => {
                if (this.mouseIn) {
                    this.wrapper.style.transitionDuration = '0s';

                    this.isTouching = true;
                    this.startTime = new Date().getTime();
                    this.xCoordinate = event.clientX;
                    this.yCoordinate = event.clientY;
                }
            });
            window.addEventListener('mousemove', (event) => {
                if (!this.xCoordinate && !this.yCoordinate) {
                    return;
                }

                const xDiff = this.xCoordinate - event.clientX;
                const yDiff = this.yCoordinate - event.clientY;

                this.wrapper.style.transform = `translateX(${-this.slideWidth * this.currentIndex - xDiff}px)`;
            });
            window.addEventListener('mouseup', (event) => {
                if (!this.xCoordinate && !this.yCoordinate) {
                    return;
                }

                const tDiff = new Date().getTime() - this.startTime;
                const xDiff = this.xCoordinate - event.clientX;

                this.isTouching = false;
                this.startTime = null;
                this.xCoordinate = null;
                this.yCoordinate = null;

                this.wrapper.style.transitionDuration = '.3s';
                if (Math.abs(xDiff) / this.slideWidth > 0.4 || (Math.abs(xDiff) > 50 && tDiff < 300)) {
                    this.goTo(this.currentIndex + (xDiff > 0 ? 1 : -1));
                } else {
                    this.wrapper.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
                }
            });
        }
    }
}