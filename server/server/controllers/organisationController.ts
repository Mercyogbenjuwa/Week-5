//access the data store.
import { IncomingMessage, ServerResponse } from 'http';

import {getAll, addItem, updateItem, deleteItem} from '../models/organisationModel'
import { getInput, requestBody } from '../helpers/helpers';

//handle requests and reponses
export function getAllOrganizations(req: IncomingMessage, res: ServerResponse){
    getAll().then((data) => {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({"status": "successfull", "message": "items got", "items": data}));
        res.end(); 

    }).catch((err) => { console.log(err.message); })
}

export function addOrganisation(req: IncomingMessage, res: ServerResponse){
    
    requestBody(req).then((data: string) => {
        let organisation =
        {
            organization: getInput("organization", data) || "NA",
            createdAt: new Date(),
            updatedAt: new Date(),
            products: [getInput("product1", data) || "None", getInput("product2", data) || "None"],
            marketValue: getInput("marketValue", data) || "NA",
            address: getInput("address", data) || "NA",
            ceo: getInput("ceo", data) || "NA",
            country: getInput("country", data) || "NA",
            id: 1,
            noOfEmployees: getInput("noOfEmployees", data) || "NA",
            employees: [getInput("employee1", data) || "None", getInput("emloyee2", data) || "None"]
        }

        res.writeHead(200, {"Content-Type": "application/json"});
        addItem(organisation).then((data) => {
            res.write(JSON.stringify({"status": "successfull", "message": "success", "itemAdded": data}));
            res.end();
        }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )
    }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )    

}


export function updateOrganizations(req: IncomingMessage, res: ServerResponse){
    requestBody(req).then((data) => {
        let property = getInput("property", data)?.toString();
        let value = getInput("value", data)?.toString();
        let itemID = Number (getInput("id", data));


        updateItem(itemID, property, value).then((data) => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ "status": "successfull", "message": "updated successfully", "updated": data}));
            res.end();
        }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )
    }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )
}


export function deleteOrganizations(req: IncomingMessage, res: ServerResponse){
    requestBody(req).then((data) => {

        let itemID = Number (getInput("id", data));


        deleteItem(itemID).then((data) => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({"status": "successfull", "itemDeleted":data}));
            res.end();
        }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )
    }).catch((err)=>{ res.writeHead(500, {"Content-Type": "application/json"}); res.end(JSON.stringify({"Error": err.message})) } )
}

