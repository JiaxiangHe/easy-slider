import TouchHandler from "./utils/TouchHandler";

/**
 * @const ATTRIBUTES
 * @description Collection of constant values for related data attributes of the module
 * @type {{CAROUSEL_WRAPPER: string, CAROUSEL_ITEM: string, CAROUSEL_PAGINATION: string}}
 */
const CLASSES = {
    CAROUSEL_WRAPPER: 'simple-carousel__wrapper',
    CAROUSEL_ITEM: 'simple-carousel__item',
    CAROUSEL_PAGINATION: 'simple-carousel__pagination'
};

/**
 * @const DEFAULT_CONFIG
 * @description Collection of configuration items
 * @type {{ debug: boolean, initialSlide: number, speed: number, loop: boolean, effect: string }}
 */
const DEFAULT_CONFIG = {
    debug: false,
    initialSlide: 0,
    speed: 300,
    loop: false,
    effect: 'slide'
}

/**
 * @class EasySlider
 * @description a simple carousel component
 */
export default class EasySlider {
    /**
     * @constructor
     * @description Sets the selector and options, then return the instance
     * @param selector {String} The selector string of the entry node 
     * @param config {DEFAULT_CONFIG} Component configuration object
     */
    constructor(selector = '.simple-carousel', config = {
        debug: false,
        initialSlide: 0,
        speed: 300,
        loop: false,
        effect: 'slide'
    }) {
        // entry element
        this.element = document.querySelector(selector); // entry node

        // properties
        this.config = Object.assign({}, DEFAULT_CONFIG, config); // config
        this.currentIndex = null;
        this.total = null;
        this.slideWidth = null;
        this.callbacks = [];

        // class
        this.elementStyle = null;
        this.wrapperStyle = null;
        this.wrapperTouch = null;

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

        // prepare class
        this.elementStyle = window.getComputedStyle(this.element, null);
        this.wrapperStyle = window.getComputedStyle(this.wrapper, null);
        this.wrapperTouch = new TouchHandler(this.wrapper);

        // prepare properties
        this.total = this.slides.length;
        this.currentIndex = this.config.initialSlide % this.total;
        this.slideWidth = this.element.clientWidth
            - parseFloat(this.elementStyle.getPropertyValue('padding-left'))
            - parseFloat(this.elementStyle.getPropertyValue('padding-right'));
        if (this.config.loop) {
            this.currentPosition = -this.slideWidth * this.total;
            this.slides.forEach((item, index) => {
                if (index < this.total) {
                    const node = item.cloneNode(true);
                    this.wrapper.appendChild(node);
                    this.slides.push(node);
                }
            });
            this.slides.forEach((item, index) => {
                if (index < this.currentIndex) {
                    this.wrapper.appendChild(item);
                }
            });
        } else {
            this.currentPosition = -this.slideWidth * this.currentIndex;
        }

        // init style
        switch (this.config.effect) {
            case 'slide':
            default:
                this.wrapper.style.transform = `translateX(${this.currentPosition}px)`;
                break;
        }
        this.slides.forEach((item) => {
            item.style.width = `${this.slideWidth}px`;
        });

        // bindEvent
        this.bindEvent();

        // event track
        this.applyEvent('init');
    }

    slideTo(index) {
        let diff = (index - this.currentIndex) % this.total;
        let nextIndex = index;
        if (this.config.loop) {
            while (nextIndex < 0) {
                nextIndex += this.total
            }
            nextIndex = nextIndex % this.total;
        } else {
            nextIndex = Math.max(Math.min(nextIndex, this.total - 1), 0);
        }
        // console.log(nextIndex);
        this.wrapper.style.transitionDuration = `${this.config.speed / 1000}s`;
        switch (this.config.effect) {
            case 'slide':
            default:
                if (this.config.loop) {
                    this.currentPosition = -this.slideWidth * (this.total + diff);
                } else {
                    this.currentPosition = -this.slideWidth * nextIndex;
                }
                this.wrapper.style.transform = `translateX(${this.currentPosition}px)`;
                break;
        }
        const timeId = setTimeout(() => {
            this.wrapper.style.transitionDuration = '0s';

            if (this.config.loop && diff) {
                let move = () => {
                    this.wrapper.appendChild(this.wrapper.children[0]);
                }
                if (diff < 0) {
                    move = () => {
                        this.wrapper.insertBefore(this.wrapper.children[this.total * 2 - 1], this.wrapper.children[0]);
                    }
                }
                for (let i = Math.abs(diff); i > 0; i--) {
                    move()
                }
                this.currentPosition = -this.slideWidth * (this.total);
                this.wrapper.style.transform = `translateX(${this.currentPosition}px)`;
            }

            clearTimeout(timeId);
        }, this.config.speed);

        this.currentIndex = nextIndex;

        // event track
        this.applyEvent('slideChange');
    }

    slideNext() {
        this.slideTo(this.currentIndex + 1);
    }

    slidePrev() {
        this.slideTo(this.currentIndex - 1);
    }

    on(action, handler) {
        this.callbacks.push({
            action,
            handler
        });
    }

    off(action, handler) {
        this.callbacks.map((event, index) => {
            if (action === event.action && handler === event.handler) {
                this.callbacks.splice(index, 1);
            }
        });
    }

    applyEvent(action) {
        this.callbacks.forEach((event) => {
            if (event.action === action) {
                event.handler.call(this);
            }
        });
    }

    cacheDom() {
        this.wrapper = this.element.querySelector(`.${CLASSES.CAROUSEL_WRAPPER}`);
        this.slides = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_ITEM}`));
        this.pagination = Array.from(this.wrapper.querySelectorAll(`.${CLASSES.CAROUSEL_PAGINATION}`));
        this.next = null;
        this.prev = null;
    }

    bindEvent() {
        // touch event
        this.wrapperTouch.on('move', (xDiff, yDiff) => {
            this.wrapper.style.transform = `translateX(${this.currentPosition - xDiff}px)`;
        });
        this.wrapperTouch.on('end', (xDiff, yDiff, tDiff) => {
            if (Math.abs(xDiff) / this.slideWidth > 0.4 || (Math.abs(xDiff) > 50 && tDiff < 300)) {
                this.slideTo(this.currentIndex + (xDiff > 0 ? 1 : -1));
            } else {
                this.wrapper.style.transitionDuration = `${this.config.speed / 1000}s`;
                this.wrapper.style.transform = `translateX(${this.currentPosition}px)`;
                const timeId = setTimeout(() => {
                    this.wrapper.style.transitionDuration = '0s';
                    clearTimeout(timeId);
                }, this.config.speed);
            }
        });
    }
}