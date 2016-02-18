
const NACCESS_FILE_NAME = '/naccess.js';

function execute () {

}

export function applyRules (req, res, data) {
    return new Promise ( (resolve, reject) => {
        console.log('applying rules');

        let urldata = data.urlData;
        let dl = urldata.dirList;
        let fs = require('fs');
        let cur;// = dl.pop();
        let stop = false;

        do {
            cur = './' + dl.join('/') + NACCESS_FILE_NAME;
            if (cur == './' + NACCESS_FILE_NAME) {
                cur = '.' + NACCESS_FILE_NAME;
                stop = true;
            }
            console.log('>' + cur);
            if (stop) {
                break;
            }
        } while ((cur = dl.pop()) !== void(0));

        // dl.forEach(cur => {
        //     if(cur){
        //         try{
        //             fs.readFile('');
        //             let naccessConfig =
        //         }catch(e){ }
        //     }
        // });

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
