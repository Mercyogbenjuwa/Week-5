import * as http from 'http';
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

export function getPageInfo(url: string): Promise<any>{
    return new Promise((resolve, reject) => {

      http.get(url, (req2) => {
        let htmlString = "";
        req2.on("data",(resp: string) => {
          htmlString += resp;
        })
        
        req2.on("end", () => {
          let dom = new JSDOM(htmlString).window.document;
          let domDescription = dom.querySelector("meta[name=decription]");
          let images = dom.querySelectorAll("img");
          let imgSrcs: any[] = [];
          for(let i = 0; i < images.length; i++){
            imgSrcs.push(images[i].src)
          }
          //let title = dom.querySelector("title").textContent;
          let obj = {
            decription: domDescription?.content,
            title: "ugon",
            imageSources: imgSrcs
          }
          resolve(obj)
          
        })
        
        req2.on("error", (err) => {
            reject(err)
        })

      })
    })
}