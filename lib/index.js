#!/usr/bin/env node
'use strict';

// everything ES6
require('babel/register');

var runNAccess = require('./naccess.js');

var nAccess = function (req, res, next) {
    if (next) {
        runNAccess(req, res, next, function(){ /* TODO:  */ });
    } else {
        return new Promise(function(resolve, reject){
            runNAccess(req, res, resolve, reject);
        });
    }
};

module.exports = nAccess;
