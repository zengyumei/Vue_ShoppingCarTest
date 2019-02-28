var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');

var documentRoot = 'D:/yan2/qianduan/Vue-practice/shoppingCarTest';
var app = express();
app.use(express.static('public'));

var server = http.createServer(function(req, res){
    var url = req.url;
    
    var path = documentRoot + url;
    console.log(path);
    var ext = path.match(/(\.[^.]+|)$/)[0];//取得后缀名
    switch(ext){ 
        case ".css":
        case ".js":
        case ".jpg":
            fs.readFile(path, 'utf-8', function(err, data){
                if(err){
                    throw err;
                } else {
                    res.writeHeader(200,{
                        "Content-Type" : {
                            ".jpg": "image/jpeg",
                            ".css": "text/css",
                            ".js": "application/javascript",
                        }[ext]
                    });
                    res.write(data);//将index.html显示在客户端
                    res.end();
                }
            }); 
            break;
        default:
            fs.readFile(path, 'utf-8', function(err, data){
                if(err){
                    throw err;
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.write(data);
                    res.end();
                }
            })
    }   
}).listen(8888);

console.log('服务器开启成功');