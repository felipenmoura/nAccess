
const NACCESS_FILE_NAME = '.naccess';

const execute = require('./execute.js');

function getNAccessFile (data) {
    let urldata = data.urlData;
    let dl = urldata.dirList;
    let fs = require('fs');
    let cur = "";
    let tmp = null;
    let pathConfig = null;
    let stop = false;

    if (dl[0]) {
        // just making it sure that if the first element
        // istn't empty, it is now (for the current path to be used)
        dl.unshift('');
    }

    // for each possible path, we try to open the naccess file
    do {
        tmp = dl.shift();
        cur+= tmp + '/';

        try{
            // the first naccess file we find, we stop the loop
            // we will treat it, and if the resulting path also has
            // an naccess file, we will treat that too
            pathConfig = require(data.urlData.serverPath + cur + NACCESS_FILE_NAME);
            return pathConfig;
        }catch(e){
            console.log(e); // TODO: identify if it is a missing file(ok) or a syntax error
        }

    } while (dl.length);
    
}

export function applyRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying rules');

        let pathConfig = getNAccessFile(data),
            result = null;
        
        execute(pathConfig, req, res, data)
            .then((result)=>{
                resolve(req, res, data);
            })
            .catch((error)=>{
                reject(error, data);
            });

        //res.status(404);
        
    });
}

export function applyHeaderRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying header rules');
        resolve(req, res);
    });
}
