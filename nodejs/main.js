var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </body>
    </html>
    `;
}

function templateList(filelist) {
    var list = '<ul>';
    for(var i = 0; i < filelist.length; i++) {
        var filename = filelist[i].substring(0, filelist[i].length-4);
        list = list + `<li><a href="/?id=${filename}">${filename}</a></li>`;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var id = queryData.id;

    var pathFiles = 'C:/Users/Kurisu/HTMLWorkspace/StudyWeb/nodejs/files';

    if(pathname == '/') {
        if(id === undefined) {
            fs.readdir(pathFiles, function(error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.Js';
                response.writeHead(200);
                response.end(templateHTML(title, templateList(filelist), `<h2>${title}</h2><p>${description}</p>`));
            });
        } else {
            fs.readdir(pathFiles, function(error, filelist) {
                fs.readFile(pathFiles+`/${id}.txt`, 'utf8', (error, description) => {
                    response.writeHead(200);
                    response.end(templateHTML(id, templateList(filelist), `<h2>${id}</h2><p>${description}</p>`));
                });
            });
        }
    } else {
      response.writeHead(404);
      response.end('Not Found')
    }
});
app.listen(80);
