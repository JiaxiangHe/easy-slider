import { isDevice } from "./index";

export default class TouchHandler {
    constructor(element) {
        this.element = element;
        
        // properties
        this.eventBinded = false;
        this.isTouching = false;
        this.xCoordinate = null;
        this.yCoordinate = null;
        this.newXCoordinate = null;
        this.newYCoordinate = null;
        this.startTime = null;

        this.callbacks = {
            start: null,
            move: null,
            end: null
        }

        if (this.element && this.element.nodeType === Node.ELEMENT_NODE) {
            this.bindEvent();
        }
    }

    on(action, callback) {
        this.callbacks[action] = callback;
    }

    off(action, callback) {
        this.callbacks[action] = null;
    }

    bindEvent() {
        this.element.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];

            this.isTouching = true;
            this.startTime = new Date().getTime();
            this.xCoordinate = touch.clientX;
            this.yCoordinate = touch.clientY;

            if (this.callbacks.start) {
                this.callbacks.start();
            }
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

            if (this.callbacks.move) {
                this.callbacks.move(xDiff, yDiff);
            }
        }, { passive: true });
        this.element.addEventListener('touchend', (event) => {
            const tDiff = new Date().getTime() - this.startTime;
            const xDiff = this.xCoordinate - this.newXCoordinate;
            const yDiff = this.yCoordinate - this.newYCoordinate;

            this.isTouching = false;
            this.startTime = null;
            this.xCoordinate = null;
            this.yCoordinate = null;
            this.newXCoordinate = null;
            this.newYCoordinate = null;

            if (this.callbacks.end) {
                this.callbacks.end(xDiff, yDiff, tDiff);
            }
        });

        if (!isDevice()) {
            this.element.addEventListener('mouseenter', () => {
                this.mouseIn = true;
            });
            this.element.addEventListener('mouseleave', () => {
                this.mouseIn = false;
            });
            window.addEventListener('mousedown', (event) => {
                if (this.mouseIn) {

                    this.isTouching = true;
                    this.startTime = new Date().getTime();
                    this.xCoordinate = event.clientX;
                    this.yCoordinate = event.clientY;

                    if (this.callbacks.start) {
                        this.callbacks.start();
                    }
                }
            });
            window.addEventListener('mousemove', (event) => {
                if (!this.xCoordinate && !this.yCoordinate) {
                    return;
                }

                const xDiff = this.xCoordinate - event.clientX;
                const yDiff = this.yCoordinate - event.clientY;

                this.callbacks.move(xDiff, yDiff);
            }, { passive: true });
            window.addEventListener('mouseup', (event) => {
                if (!this.xCoordinate && !this.yCoordinate) {
                    return;
                }

                const tDiff = new Date().getTime() - this.startTime;
                const xDiff = this.xCoordinate - event.clientX;
                const yDiff = this.yCoordinate - event.clientY;

                this.isTouching = false;
                this.startTime = null;
                this.xCoordinate = null;
                this.yCoordinate = null;

                this.callbacks.end(xDiff, yDiff, tDiff);
            });
        }
    }
}