import { IncomingMessage } from "http";

export function getInput(key: string, data: string){
    let value;
    let str = JSON.stringify(data).replace(/\\r\\n/g,"");
    str = str.replace(/\\/g,"");
    let regex = new RegExp(`name="${key}"[a-zA-Z0-9@#\$%\^&\*(\)_ ]*`, "i")
    value = str.match(regex)?.toString().replace(`name="${key}"`,"");
  
    return value;
  }

  export function requestBody(req: IncomingMessage): Promise<string>{
    return new Promise((resolve, reject) => {
        let dataString: string = "";
        req.on("data", (data) => {
            dataString += data
        })
    
        req.on("end", () => {
            resolve(dataString)
        })

        req.on("error", (err) => {
            reject(err.message)
        })

    })
  }
    //export default getInput