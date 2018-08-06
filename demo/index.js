import EasySlider from "../src";
import "../src/index.scss";

const easySlider = new EasySlider('.simple-carousel', {
    loop: true,
    initialSlide: 1
});
function handler() {
    console.log(this.currentIndex);
    if (this.currentIndex === 2) {
        // remove event handler
        easySlider.off('slideChange', handler);
    }
};
// add event handler
easySlider.on('slideChange', handler);