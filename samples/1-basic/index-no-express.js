const PORT=3111;

var http = require('http');
var fs = require('fs');

var nAccess = require('../../lib/'); // requiring nAccess from the parenting folder

function end (res, data) {
    res.end(fs.readFileSync(__dirname +'/'+ data.urlData.normalized, 'utf8'));
}

//Create a server
var server = http.createServer((req, res)=>{
    nAccess(req, res)
        .then(data=>{
            end(res, data);
        }).catch((err, data)=>{
            end(res, data);
        });
});

// starting the server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});