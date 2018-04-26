const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3001);
console.log('Server is listening on 3001.');

const default_headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};

const default_url = 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1';

app.get("/items/:id?", function(req, res, next){
    doRequest(res, {path: req.params.id, method: 'GET'});
});

app.post("/items", function(req, res, next){
    doRequest(res, {path: '', method: 'POST', body: req.body});
});

app.put("/items/:id", function(req, res, next){
    doRequest(res, {path: req.params.id, method: 'PUT', body: req.body});
});

app.delete("/items/:id", function(req, res, next){
    doRequest(res, {path: req.params.id, method: 'DELETE'});
});

const doRequest = (res, params) => {
    let options = {
        url: 'http://5ac7331ac884c50014441b16.mockapi.io/api/v1/items' + (params.path ? '/' + params.path : ''),
        method: params.method,
        headers: default_headers,
        json:  needsBody(params.method) ? params.body : true
    };

    console.log('### options=' + JSON.stringify(options));

    request(options, function (error, response, body) {
        res.writeHead(response.statusCode, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        const result = {
            response: response,
            body: body,
            cookie: response.headers['set-cookie'],
            error: error
        };
        console.log('### server.response=' + JSON.stringify(body));
        res.end(JSON.stringify(result));
    });
};

const needsBody = (method) => {
    return method === 'POST' || method === 'PUT';
};