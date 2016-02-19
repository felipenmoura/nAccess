
const NACCESS_FILE_NAME = '.naccess';

function execute () {

}

export function applyRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying rules');

        let urldata = data.urlData;
        let dl = urldata.dirList;
        let fs = require('fs');
        let cur = "";
        let tmp = null;
        let pathConfig = null;
        
        if (dl.length !== 1 && dl[0]) {
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
                pathConfig = require(data.urlData.serverPath + cur + NACCESS_FILE_NAME);
            }catch(e){
                pathConfig = null;
            }
            console.log(pathConfig);
        } while (dl.length);
            
// working inside out
//        let stop = false;
//        do {
//            cur = './' + dl.join('/') + NACCESS_FILE_NAME;
//            if (cur == './' + NACCESS_FILE_NAME) {
//                cur = '.' + NACCESS_FILE_NAME;
//                stop = true;
//            }
//            console.log('>' + cur);
//            if (stop) {
//                break;
//            }
//        } while ((cur = dl.pop()) !== void(0));

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
