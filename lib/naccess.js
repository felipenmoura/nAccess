/**
 *
 *
 */
import { applyRules, applyHeaderRules } from './utils/applier.js';
import { treatReqUrl } from './utils/treatReqURL.js';
import { noQuery } from './portable/stringUtils.js';

//let escapeHTML = require('escape-html');

module.exports = function (req, res, resolve, reject) {

    let data = {
        urlData: treatReqUrl(req)
    };

    applyRules(req, res, data)
        .catch(err=>{
            console.error('Failed applying rules!', err);
            reject(err);
        })
        .then(applyHeaderRules)
        .catch(err=>{
            console.error('Failed applying header rules!', err);
            reject(err);
        })
        .then(function (result) {
            console.log('DONE');
            resolve();
        });
};
