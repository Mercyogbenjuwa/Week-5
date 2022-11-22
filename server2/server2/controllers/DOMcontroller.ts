import { IncomingMessage, ServerResponse } from 'http';
import {getPageInfo} from '../models/DOMmodels';

export function getPageMetaInfo(url: string, req: IncomingMessage, res: ServerResponse): any{
    getPageInfo(url).then((data:any) => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(data))
    }).catch((err: any) => { res.writeHead(500, {"Content-Type": "application/json"}); res.end( JSON.stringify(err))})
}