"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios_1 = __importDefault(require("axios"));
const app = express();
let accessToken;
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    // Check req obj for any needed headers
    const token = req.header('access_token');
    if (token && token.length > 1) {
        accessToken = token;
        next();
    }
    else {
        const authBody = {
            client_id: ' 466c8f34-e2af-42bb-87c2-4802206168f7',
            client_secret: 'islsiVY6tCzezyBOHkkiMEXK7Nq07mCyj3MurrvzdYU=',
            Resource: '2cd2fb9a-18c2-4eb1-931b-8885c6151548',
            grant_type: 'client_credentials'
        };
        const url = 'https://login.microsoftonline.com/2a3033c2-ad76-426c-9c5a23233cde4cde/oauth2/token';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        axios_1.default.post(url, authBody, { headers: headers }).then(res => {
            accessToken = res.data.access_token;
            next();
        }).catch(err => {
            throw err;
        });
    }
});
app.get('/hello', (req, res) => {
    console.log(accessToken);
    res.send('Hello from the project root!');
});
app.get('*', (req, res) => {
    res.send({
        env: process.env,
        port: process.env.port
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err['status'] || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.port || 8080);
app.listen(8080, () => {
    console.log('App started!!');
});
//# sourceMappingURL=index.js.map