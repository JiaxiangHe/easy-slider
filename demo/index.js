import SimpleCarousel from "../src";

import "../src/index.scss"

const test = new SimpleCarousel('.simple-carousel', {
    loop: true,
    initialSlide: 2
});
console.log(test);