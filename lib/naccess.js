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
        .then(applyHeaderRules)
        .then(function (result) {
            resolve();
        });
};
