#!/usr/bin/env node
'use strict';

// everything ES6
require('babel/register');

var runNAccess = require('./naccess.js');

// It works both as a Promise or a middleware
var nAccess = function (req, res, next) {
    if (next) {
        runNAccess(req, res, function(){
            next(); // express will not receive the data back
        }, function(err){
            console.error('ERR_RUNNACCESS', err);
        });
    } else {
        return new Promise(function(resolve, reject){
            return runNAccess(req, res, resolve, reject);
        });
    }
};

module.exports = nAccess;
