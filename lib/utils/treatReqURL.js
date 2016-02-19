/**
 *
 *
 */

let path = require('path'),
    url = require('url'),
    querystring = require('querystring');

import { noQuery } from '../portable/stringUtils.js';
import * as detector from './detector.js'

export function treatReqUrl (req) {
    
    let fullPath = path.resolve(req.url),
        parsed = url.parse(fullPath),
        port = req.headers.host.split(':')[1] || 80,
        query = querystring.parse(parsed.query),
        queryString = parsed.query,
        file = noQuery(path.basename(fullPath), queryString) || 'index.html' ,
        ext = path.extname(file).replace('.', ''),
        dir = path.dirname(fullPath),
        serverPath= require.main.filename;
    
    serverPath = serverPath.substring(0, serverPath.lastIndexOf('/')+1);

    let data = {
            protocol: (req.connection.encrypted ? 'https': 'http'),
            port,
            host: req.headers.host.replace(':' + port, ''),
            normalized: path.normalize(fullPath),
            dir,
            dirList: dir.split('/').slice(1),//.reverse(),
            file,
            fileName: noQuery(file, queryString).replace(new RegExp(`\\.${ext}$`), ''),
            serverPath,
            ext,
            query,
            queryString,
            fullPath: noQuery(fullPath, queryString),
            //relativePathToReq: noQuery(path.relative(__dirname, fullPath), queryString),
            //relativePathToNAccess: path.relative(fullPath, __dirname),
            remoteIP: detector.getUserIP(req),
            platform: detector.getPlatform(req),
            ua: detector.getUserAgent()
        };
    //console.log(data);
    return data;
}
