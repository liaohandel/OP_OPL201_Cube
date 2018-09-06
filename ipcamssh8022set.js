//const spawn = require('child_process').spawn;
var request = require('request');
var spawn = require('child_process').spawn;
var Emitter = require('events').EventEmitter;
var platform = require('os').platform();
//var lock = require('lock')();
var async = require('async');
var uuid = require('uuid');
var url = require('url');

//=== file load module === 
var path = require('path');
var fs = require('fs');
var os = require('os');

var filename = "PDDATA.txt"
var filepath = path.join(__dirname, ("/public/" + filename));
var pdjobj ={}


//link gateway pam  login web server
var Client = require('node-rest-client').Client;
var client = new Client();

var seturl = ""
var chkurl = ""
var setport = 3000
var linkchkcount = 0

var ddsnurl = "http://106.104.112.56/Cloud/API/linkbox.php"
var vdsnurl = "http://106.104.112.56/Cloud/API/videobox.php"
var devloadurl = "http://106.104.112.56/Cloud/API/linkbox.php"
var setdeviceip = 'https://c4915760.ngrok.io'
var setdeviceport = 'C922'
var setuuid = '1234567890abcdefghijk'

//const ls = spawn('ls', ['-lh', '/usr']);

var bin = './llngrok' + (platform === 'win32' ? '.exe' : '');
//var ready = /starting web service.*addr=(\d+\.\d+\.\d+\.\d+:\d+)/;
//var ready = "http://[[a-zA-Z0-9.-/_]+[[a-zA-Z0-9-./_]+[[a-zA-Z0-9-.:/_]+[:0-9]+";
var ready = "tcp://[[a-zA-Z0-9.-/_]+[[a-zA-Z0-9-./_]+[[a-zA-Z0-9-.:/_]+[:0-9]+";
var inUse = /address already in use/;
//const ls = spawn('./ngrok', ['-config=ngrok.cfg', '192.168.5.106:8006']);

//const rrngrok = spawn('./llngrok', ['-config=ngrok.cfg','--log=stdout', '192.168.5.106:8006']);
const rrngrok = spawn('./llngrok', ['-config=ngrok.cfg','--log=stdout','-proto=tcp', '127.0.0.1:22']);


var noop = function() {};
var emitter = new Emitter().on('error', noop);
var ngrok, api, tunnels = {};

var xxurl ="";
// ./ngrok -config=ngrok.cfg 192.168.5.106:8006
/*
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

*/

/*
rrngrok.stdout.on('data', function (data) {
	var msg = data.toString();
	//console.log("handelx0",msg);
	var addr = msg.match(ready);
	//var addr = msg.match("Url");
	if(addr){
		xxurl = addr[0];
		console.log("show="+xxurl)
	}
	if (addr) {
		api = request.defaults({
			baseUrl:  addr[0],
			json: true
		});
		
		console.log("handelx1",JSON.stringify(api));
		//done();
	} else if (msg.match(inUse)) {
		console.log("handelx2",xxurl);
		done(new Error(msg.substring(0, 10000)));
	}
});

rrngrok.stderr.on('data', function (data) {
	var info = data.toString().substring(0, 10000);
	console.log("handelx3",info);
	done(new Error(info));
});

rrngrok.on('exit', function () {
	api = null;
	tunnels = {};
	console.log("handelx4",xxurl);
	//emitter.emit('disconnect');
	
});

rrngrok.on('close', function () {
	return emitter.emit('close');
});
*/

loaddata();


function disconnect(publicUrl, cb) {
	cb = cb || noop;
	if (typeof publicUrl === 'function') {
		cb = publicUrl;
		publicUrl = null;
	}
	if (!api) {
		return cb();
	}
	if (publicUrl) {
		return api.del(
			tunnels[publicUrl],
			function(err, resp, body) {
				if (err || resp.statusCode !== 204) {
					return cb(err || new Error(body));
				}
				delete tunnels[publicUrl];
				emitter.emit('disconnect', publicUrl);
				return cb();
			});
	}

	return async.each(
		Object.keys(tunnels),
		disconnect,
		function(err) {
			if (err) {
				emitter.emit('error', err);
				return cb(err);
			}
			emitter.emit('disconnect');
			return cb();
		});
}

function loaddata(){
	fs.readFile(filepath, function(err, content) {
        let uuiddata = content.toString();
		pdjobj= JSON.parse(uuiddata);
		
        ddsnurl = pdjobj.PDDATA.dsnurl;
        vdsnurl = pdjobj.PDDATA.videodsnurl;
		devloadurl =  pdjobj.PDDATA.devloadurl;
        setuuid =  pdjobj.PDDATA.UUID;
		
        console.log("uuids = ", setuuid);
        console.log("dsnurl = ", ddsnurl);
        console.log("videodsnurl = ",vdsnurl);//devloadur
        console.log("devloadur = ", devloadurl)
		
		
		if(pdjobj.PDDATA.linkoffmode != 1){
			
			rrngrok.stdout.on('data', function (data) {
				var msg = data.toString();
				//console.log("handelx0",msg);
				//var addr = msg.match(ready);
				var addr = msg.match(ready);
				//var addr = msg.match("Url");
				if(addr){
					if(xxurl!=addr[0]){
						xxurl = addr[0];
						console.log("show="+xxurl)
						
						seturl = addr[0];
						console.log("link=>"+seturl);
						//setddsnurl = ddsnurl+'?DeviceIP='+seturl+'&UUID='+setuuid
						//setddsnurl = ddsnurl+'DeviceIP='+seturl+'&DevicePort='+setdeviceport+'&UUID='+setuuid
						//106.104.112.56/Cloud/API/videobox.php?UUID=111&DevicePOS=C906&DeviceIP=xxx.xxx.xxx:8006
						//http://tscloud.opcom.com/Cloud/API/v2/UpdateIP?UUID=OFA1C002DB290C1F72CD5B0C&UpdateIP=https://ngrok.com/1111
						//setddsnurl = vdsnurl+'?UUID='+setuuid+'&DeviceIP='+seturl+'&DevicePOS='+campos
						base_updateurl="http://tscloud.opcom.com/Cloud/API/v2/UpdateIP"
						updateddsnurl = base_updateurl+'?UUID='+setuuid+'&UpdateIP='+seturl
						
						//setddsnurl = vdsnurl+'?UUID='+setuuid+'&DeviceIP='+seturl+'&DevicePOS='+setdeviceport
						//setddsnurl = vdsnurl+'?UUID='+setuuid+'&DevicePOS='+setdeviceport+'&DeviceIP='+seturl
						
						client.get(updateddsnurl, function (data, response) {
							console.log("ssh link upload ok...[",updateddsnurl,"]");						
						});
					}					
				} else if (msg.match(inUse)) {
					console.log("handelx2",xxurl);
					done(new Error(msg.substring(0, 10000)));
				}
			});

			rrngrok.stderr.on('data', function (data) {
				var info = data.toString().substring(0, 10000);
				console.log("handelx3",info);
				done(new Error(info));
			});

			rrngrok.on('exit', function () {
				api = null;
				tunnels = {};
				console.log("handelx4",xxurl);
				//emitter.emit('disconnect');
				
			});

			rrngrok.on('close', function () {
				return emitter.emit('close');
			});
		}else {
			console.log("off link ... ")
		}
		
	});
}
