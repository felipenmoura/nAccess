/**
 *
 *
 */
import { applyRules, applyHeaderRules } from './utils/applier.js';
import { URLData } from './utils/URLData.js';
import { noQuery } from './portable/stringUtils.js';

//let escapeHTML = require('escape-html');

module.exports = function NAccess (req, res, resolve, reject) {

    let data = {
        urlData: new URLData(req, res)
    };

    applyRules(req, res, data)
        .catch(err=>{
            console.error('Failed applying rules!', err);
            reject(err);
        })
        .then(_=>{
            return applyHeaderRules(req, res, data);
        })
        .catch(err=>{
            console.error('Failed applying header rules!', err);
            reject(err);
        })
        .then(function () {
            if(data.urlData.state.hasRedirect){
                console.log('redirecting to', data.urlData.normalized);
                res.redirect(data.urlData.getFullAddress());
            }
            resolve(data);
            console.log('DONE');
        });
};
