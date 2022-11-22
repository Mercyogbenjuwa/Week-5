import * as http from "http";
import { IncomingMessage, Server, ServerResponse } from "http";
// import * as fs from 'fs';
// import * as Stream from 'stream';
// import { Console } from "console";

import { getAllOrganizations, addOrganisation, updateOrganizations, deleteOrganizations } from "./controllers/organisationController";

/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      getAllOrganizations(req, res);      
    }
    else 

    if (req.method === "POST") {
      addOrganisation(req, res);
    }
    else 

    if (req.method === "PUT") {
      try{
        updateOrganizations(req, res);
      }catch(err:any){console.log(err.message)}
    }

    else 

    if (req.method === "DELETE") {
      deleteOrganizations(req, res);
    }

  }
);

server.listen(3005,()=>{
  console.log("i am here")
});

// async () => {
//   for(let await data of dataFileStream){
//     if (!res.write(data)) {
//       res.on("drain", () => {
//         console.log("stopped but started again");
//       })
//     }
     
//   }
// }();