"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageInfo = void 0;
const http = __importStar(require("http"));
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
function getPageInfo(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (req2) => {
            let htmlString = "";
            req2.on("data", (resp) => {
                htmlString += resp;
            });
            req2.on("end", () => {
                let dom = new JSDOM(htmlString).window.document;
                let domDescription = dom.querySelector("meta[name=decription]");
                let images = dom.querySelectorAll("img");
                let imgSrcs = [];
                for (let i = 0; i < images.length; i++) {
                    imgSrcs.push(images[i].src);
                }
                //let title = dom.querySelector("title").textContent;
                let obj = {
                    decription: domDescription === null || domDescription === void 0 ? void 0 : domDescription.content,
                    title: "ugon",
                    imageSources: imgSrcs
                };
                resolve(obj);
            });
            req2.on("error", (err) => {
                reject(err);
            });
        });
    });
}
exports.getPageInfo = getPageInfo;
