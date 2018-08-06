# easy-slider
A simple carousel works without frameworks, tiny size and easy to use.
Support commonly used desktop browsers include IE10, and commonly used mobile broswers.
## Install
```bash
npm i easy-slider
```
## Usage
```javascript
import EasySlider from "easy-slider";
import from "easy-slider/src/index.scss";
/**
 * @constructor
 * @description Sets the selector and options, then return the instance
 * @param selector {String} The selector string of the entry node
 * @param config {Object} Component configuration object
 */
var easySlider = new EasySlider('.simple-carousel', {
    loop: true,
    initialSlide: 0
});
```
*Note: we need some basic css support, you could use your own code instead*
```sass
.simple-carousel {
    overflow: hidden;

    &__wrapper {
        display: flex;
        transition: transform linear 0s 0s;
    }
    &__item {
        flex-shrink: 0;
    }
}
```
## Documentation
### Configuration
Check the available configuration list:

| Parameter | Type | Default | Description |
| ---------- | ----------- | ----------- | ----------- |
| debug | boolean | false | Open debug info (indevelopemnt) |
| initialSlide | number | 0 | Set initial slide index (start with 0) |
| speed | number | 300 | Slide animation duration (in ms) |
| loop | boolean | false | Set to true to enable continuous loop mode |
| effect | string | 'slide' | Tranisition effect. Only support "slide" for now |

### Methods
We provide usefull methods to play with for EasySlider instance.

| Methode name | Discription |
| ---------- | -----------|
| slideTo(index) | Go to the 'index'th slide  |
| slideNext() | Go to next slide |
| slidePrev() | Go to previous slide |
| on(event, callback) | Add event listener |
| off(event, callback) | Remove evet listener |

### Event
We provide event hander to track the component behaviour instead of callbacks.
```javascript
var easySlider = new EasySlider('.simple-carousel');
// add event handler
function initHandler() {
    console.log(this);
};
easySlider.on('init', initHandler);
// remove event handler
easySlider.off('init', initHandler);
```
*Note: `this` keyword within event handler always points to EasySlider instance*

| Event name | Arguments | Description |
| ---------- | -----------| -----------|
| init |  | Call after slider initialized |
| slideChange | | Call after slider changed