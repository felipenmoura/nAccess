export function getUserIP (req) {
    return req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
}

export function getPlatform (req) {
    var ua = req.headers['user-agent'],
        data = {};

    if (/mobile/i.test(ua)) {
        data.Mobile = true;
    }

    if (/like Mac OS X/.test(ua)) {
        data.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        data.iPhone = /iPhone/.test(ua);
        data.iPad = /iPad/.test(ua);
    }else if (/Android/.test(ua)) {
        data.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
    }

    if (/webOS\//.test(ua)) {
        data.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
    } else if (/(Intel|PPC) Mac OS X/.test(ua)) {
        data.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
    } else if (/Windows NT/.test(ua)) {
        data.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
    }

    return data;
};

export function getUserAgent () {
    let ua = new require('express-useragent').UserAgent();
    //console.log(ua);
    return ua;
};
