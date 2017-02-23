//var mime = require('mime');
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var formidable = require("formidable"); //载入 formidable
var querystring = require('querystring');
var app = http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    console.log(pathname);
    if(pathname=='/'){
        fs.createReadStream('demo.html').pipe(res);
    }else if(pathname=='/post'){
        //此处为上传使用.file[0]
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(files.fileUpload);
            fs.createReadStream(files.fileUpload.path).pipe(fs.createWriteStream('./'+files.fileUpload.name));
        });
    }else{
        console.log(pathname);
        fs.createReadStream('.'+ pathname).pipe(res);
        //res.end('404');
    }
}).listen(8080);
