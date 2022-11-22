import { IncomingMessage, Server, ServerResponse } from "http";
import * as http from 'http';
import { getPageMetaInfo } from "./controllers/DOMcontroller";
import * as fs from 'fs'
//import { url } from "inspector";

/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if(req.method === "GET" && req.url?.match(/\/[a-z0-9\.]+/i)){
      let url = req.url?.replace("/url=", "");
      url = url ? url : "http://localhost:3001";
      //res.end(url);
      getPageMetaInfo(url, req, res);      
      return;

    }

    if (req.method === "GET") {
       let indexPage = fs.readFileSync(__dirname+"/index.html");
       res.writeHead(200,{"Content-Type": "text/html"})
       res.end(indexPage);

      //res.end(JSON.stringify(req.headers))
      //res.end(JSON.stringify({ name: "hello" }));
      
    }


  }
);

server.listen(3001, ()=>{
  console.log("i am here")
});

// function getHTML(url){
//   fetch(url).then((page) => {
//     let dom = new JSDOM(page);
//   }).catch((err) => {})
// }