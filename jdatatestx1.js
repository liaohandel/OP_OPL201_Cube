console.log("[linkgateway ] jdatatestx1  ...");

var path = require('path');
var fs = require('fs');
var os = require('os');

var filename = "PDDATA.txt"
var filepath = path.join(__dirname, ("/public/" + filename));
var pdjobj ={}

{
    fs.readFile(filepath, function(err, content) {
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        let uuiddata = content.toString();
        //let jobj = JSON.parse(uuiddata);
		pdjobj= JSON.parse(uuiddata);
        //var jpam = jobj[0];
        //console.log(" txt find ok ! ... \n", uuiddata);
        //console.log("uuids = ", jobj.uuid);
        //console.log("dsnurl = ", jobj.dsnurl);
        console.log("uuids = ", pdjobj.PDDATA.UUID);
        console.log("dsnurl = ", pdjobj.PDDATA.dsnurl);
        console.log("videodsnurl = ", pdjobj.PDDATA.videodsnurl);
	});
}