import * as fs from 'fs';

let dbFile = __dirname+'/database.json';

export function getAll(): Promise<any>{
    return new Promise((resolve, reject) => {

        let dataFileStream = fs.createReadStream(dbFile, {encoding: "utf8"});
        let dataStrings: string = "";
        dataFileStream.on("data", (data) => {
            dataStrings += data;
        })

        dataFileStream.on("end", () => {
          resolve(dataStrings);
        })
        dataFileStream.on("error", (err) => {
          reject(err)
        })
    })
}


export function addItem(item: any): Promise<any>{
    return new Promise((resolve, reject ) => {
  
        if(!fs.existsSync(dbFile)){
            fs.writeFileSync(dbFile, JSON.stringify(([item]), null, 3)) ;
            resolve(item);
            return;
        }
        
        let dataFileStream = fs.createReadStream(dbFile, {encoding: "utf8"});
            let fileData: string = "";
          
            dataFileStream.on("data", (data) => {
                fileData += data;
            })
    
            dataFileStream.on("end", () => {
                let dataObj = JSON.parse(fileData);
                item.id = dataObj[dataObj.length - 1].id + 1;
                dataObj.push(item);
            
                fs.writeFileSync(dbFile,JSON.stringify(dataObj, null, 3));
                resolve(item)
            })
    
          dataFileStream.on("error", (err) => {
              reject(err)
          })
         
    })
}


export function updateItem(itemID: number, property: any, propertyValue: any): Promise<any>{
    return new Promise((resolve, reject) => {
      let dataFileStream = fs.createReadStream(dbFile, {encoding: "utf8"});
      let fileData: string = "";
      dataFileStream.on("data", (data) => {
        fileData += data;
      })

      dataFileStream.on("end", () => {
 
        let dataObj = JSON.parse(fileData);
        let targetObjIndex = dataObj.findIndex((a: any) => { return a.id == itemID });
        if(targetObjIndex !== -1){
          dataObj[targetObjIndex][property] = propertyValue;
          dataObj[targetObjIndex].updatedAt = new Date();
        }

        const writable = fs.createWriteStream(dbFile);
        writable.write(JSON.stringify(dataObj, null, 3));
        writable.end();
        resolve(dataObj[targetObjIndex])
        
      })
      dataFileStream.on("error", (err) => {
          reject(err)
      })
    })
}


export function deleteItem(itemID: number): Promise<string>{
    return new Promise((resolve, reject) => {
      let dataFileStream = fs.createReadStream(dbFile, {encoding: "utf8"});
      let fileData: string = "";
      
      dataFileStream.on("data", (data) => {
        fileData += data;
      })

      dataFileStream.on("end", () => {
        
        let dataObj = JSON.parse(fileData);
        let targetObjIndex = dataObj.findIndex((a: any) => { return a.id == itemID });
        if(targetObjIndex !== -1){
          dataObj.splice(targetObjIndex, 1);
        }

        const writable = fs.createWriteStream(dbFile);
        writable.write(JSON.stringify(dataObj, null, 3));
        writable.end();
        resolve("Deleted successfully")
        
      })

      dataFileStream.on("error", (err) => {
          reject(err.message)
      })
    })

}
//export default getAll