"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
const fs_1 = require("fs");
const sanitizer_1 = require("./sanitizer");
const rglr = fs_1.readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = fs_1.readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = fs_1.readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
function getCss(theme, fontSize) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';
    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizer_1.sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}
function getHtml(parsedReq) {
    const { theme, fontSize, images, widths, heights } = parsedReq;
    return `<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="logo-wrapper">
                ${images.map((img, i) => getPlusSign(i) + getImage(img, widths[i], heights[i])).join('')}
            </div>
        </div>
    </body>
</html>`;
}
exports.getHtml = getHtml;
function getImage(src, width = 'auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizer_1.sanitizeHtml(src)}"
        width="${sanitizer_1.sanitizeHtml(width)}"
        height="${sanitizer_1.sanitizeHtml(height)}"
    />`;
}
function getPlusSign(i) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
//# sourceMappingURL=template.js.map