"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequest = void 0;
const url_1 = require("url");
function parseRequest(req) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = url_1.parse(req.url || '/', true);
    const { fontSize, images, widths, heights, theme, md } = (query || {});
    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    }
    else if (arr.length === 1) {
        text = arr[0];
    }
    else {
        extension = arr.pop();
        text = arr.join('.');
    }
    const parsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
    return parsedRequest;
}
exports.parseRequest = parseRequest;
function getArray(stringOrArray) {
    if (typeof stringOrArray === 'undefined') {
        return [];
    }
    else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    }
    else {
        return [stringOrArray];
    }
}
function getDefaultImages(images, theme) {
    const defaultImage = theme === 'light'
        ? 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg'
        : 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg';
    if (!images || !images[0]) {
        return [defaultImage];
    }
    if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
        images[0] = defaultImage;
    }
    return images;
}
//# sourceMappingURL=parser.js.map