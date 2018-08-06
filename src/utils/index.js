/**
 * No Operation function
 */
export const noop = () => ({});


/**
 * check is Device
 */
export const isDevice = () => /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
