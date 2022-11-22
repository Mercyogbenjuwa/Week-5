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
const http = __importStar(require("http"));
const DOMcontroller_1 = require("./controllers/DOMcontroller");
const fs = __importStar(require("fs"));
/*
implement your server code here
*/
const server = http.createServer((req, res) => {
    var _a, _b;
    if (req.method === "GET" && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/[a-z0-9\.]+/i))) {
        let url = (_b = req.url) === null || _b === void 0 ? void 0 : _b.replace("/url=", "");
        url = url ? url : "http://localhost:3001";
        //res.end(url);
        DOMcontroller_1.getPageMetaInfo(url, req, res);
        return;
    }
    if (req.method === "GET") {
        let indexPage = fs.readFileSync(__dirname + "/index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexPage);
        //res.end(JSON.stringify(req.headers))
        //res.end(JSON.stringify({ name: "hello" }));
    }
});
server.listen(3001, () => {
    console.log("i am here");
});
// function getHTML(url){
//   fetch(url).then((page) => {
//     let dom = new JSDOM(page);
//   }).catch((err) => {})
// }
