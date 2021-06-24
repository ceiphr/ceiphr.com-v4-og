"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenshot = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const options_1 = require("./options");
let _page;
async function getPage(isDev) {
    if (_page) {
        return _page;
    }
    const options = await options_1.getOptions(isDev);
    const browser = await puppeteer_core_1.default.launch(options);
    _page = await browser.newPage();
    return _page;
}
async function getScreenshot(html, type, isDev) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
exports.getScreenshot = getScreenshot;
//# sourceMappingURL=chromium.js.map