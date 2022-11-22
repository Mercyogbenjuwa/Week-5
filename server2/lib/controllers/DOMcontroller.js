"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageMetaInfo = void 0;
const DOMmodels_1 = require("../models/DOMmodels");
function getPageMetaInfo(url, req, res) {
    DOMmodels_1.getPageInfo(url).then((data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }).catch((err) => { res.writeHead(500, { "Content-Type": "application/json" }); res.end(JSON.stringify(err)); });
}
exports.getPageMetaInfo = getPageMetaInfo;
