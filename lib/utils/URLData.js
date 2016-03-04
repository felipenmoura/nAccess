let path = require('path'),
    url = require('url'),
    querystring = require('querystring');

import { noQuery } from '../portable/stringUtils.js';
import * as detector from './detector.js'
    
export function URLData (req) {
    
    let treatURL = _url=>{
        let fullPath = path.resolve(_url),
            parsed = url.parse(fullPath),
            port = req.headers.host.split(':')[1] || 80,
            query = querystring.parse(parsed.query),
            queryString = parsed.query,
            file = noQuery(path.basename(fullPath), queryString) || 'index.html' ,
            ext = path.extname(file).replace('.', ''),
            dir = path.dirname(fullPath),
            serverPath= require.main.filename;
    
        serverPath = serverPath.substring(0, serverPath.lastIndexOf('/')+1);

        this.protocol= (req.connection.encrypted ? 'https': 'http');
        this.port = port;
        this.host= req.headers.host.replace(':' + port, '');
        this.normalized= path.normalize(fullPath);
        this.dir = dir;
        this.dirList= dir.split('/').slice(1);
        this.file = file;
        this.fileName= noQuery(file, queryString).replace(new RegExp(`\\.${ext}$`), '');
        this.serverPath = serverPath;
        this.ext = ext;
        this.query = query;
        this.queryString = queryString;
        this.fullPath= noQuery(fullPath, queryString);
        //relativePathToReq: noQuery(path.relative(__dirname, fullPath), queryString),
        //relativePathToNAccess: path.relative(fullPath, __dirname),
        this.remoteIP= detector.getUserIP(req);
        this.platform= detector.getPlatform(req);
        this.ua= detector.getUserAgent();
        this.state = {};
    }
    
    this.redirect = (newURL)=>{
        // only internal redirects (same protocol, domain and port)
        treatURL(newURL);
        this.state.hasRedirect = true;
    };
    
    this.unsafeRedirect = (newURL)=>{
        // external redirects (may change everything)
        // TODO: find a way to do it
    };
    
    treatURL(req.url);
    
    return this;
};
