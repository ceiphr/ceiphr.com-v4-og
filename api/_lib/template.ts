import {readFileSync} from 'fs';
import marked from 'marked';
import {sanitizeHtml} from './sanitizer';
import {ParsedRequest} from './types';

const twemoji = require('twemoji');
const twOptions = {folder: 'svg', ext: '.svg'};
const emojify = (text: string) => twemoji.parse(text, twOptions);

const nhg = readFileSync(`${__dirname}/../_fonts/neue-haas-grotesk-display.woff2`).toString('base64');

function getCss(fontSize: string) {
    // let background = '#D1D5DB';
    let foreground = 'black';

    return `
    @font-face {
        font-family:"neue-haas-grotesk-display";
        src: url(data:font/woff2;charset=utf-8;base64,${nhg}) format('woff2');
        font-display:swap;font-style:normal;font-weight:900;
    }

    body {
        background: url("https://www.ceiphr.com/bg.jpg");
        background-size: cover;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        width: 18rem;
        height: 18rem;
        margin: 0 0.5rem;
    }

    .spacer {
        margin: 100px;
    }
    
    .heading {
        font-family: 'neue-haas-grotesk-display', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        text-transform: uppercase;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const {text, md, fontSize, images, widths, heights} = parsedReq;
    return `<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getImage(img, widths[i], heights[i])
                ).join('')}
            </div>
            <div class="spacer">
            <div class="heading">
                ${emojify(
                md ? marked(text) : sanitizeHtml(text)
                )}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width = 'auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}
