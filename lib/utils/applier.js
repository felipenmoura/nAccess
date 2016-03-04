
const NACCESS_FILE_NAME = '.naccess';

const execute = require('./execute.js');

function getNAccessFiles (data) {
    let urldata = data.urlData;
    let dl = urldata.dirList;
    let fs = require('fs');
    let cur = "";
    let tmp = null;
    let pathConfigs = [];
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
        console.log(cur + NACCESS_FILE_NAME);

        try{
            pathConfigs.push(require(data.urlData.serverPath + cur + NACCESS_FILE_NAME));
        }catch(e){
            console.log(e); // TODO: identify if it is a missing file(ok) or a syntax error
        }
        
        // the first naccess file we find, we stop the loop
        // we will treat it, and if the resulting path also has
        // an naccess file, we will treat that too
        break;

    } while (dl.length);
    
    return pathConfigs;
}

export function applyRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying rules');

        let pathConfigs = getNAccessFiles(data),
            result = null;
        
        for (let i=0, l= pathConfigs.length; i<l; i++) {
            result = execute(pathConfigs[i], req, res, data);
        }

        res.status(404);
        resolve(req, res, data);
    });
}

export function applyHeaderRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying header rules');
        resolve(req, res);
    });
}
