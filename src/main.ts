import * as pg from "pg"
import * as express from "express"
import { hostname } from "os"
import * as fs from "fs"
import * as https from "https"
import * as http from "http"


var privateKey  = fs.readFileSync( __dirname + '/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/sslcert/server.crt', 'utf8');


var credentials = {key: privateKey, cert: certificate};

import * as swaggerUi from  'swagger-ui-express';
const swaggerDocument = require('./swagger.json');

var app = express()
let port = 3010
let portHttps = 3443

var swaggerOptions:swaggerUi.SwaggerOptions = {

  };


app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host')+"/api";
    swaggerDocument.servers = [{url:"http://" + hostname() +":"+port+"/api/v1"},
    {url:"http://" + hostname() +":"+port+"/api/v2"}]
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serveFiles(swaggerDocument, swaggerOptions), swaggerUi.setup());

app.use('/static', express.static(__dirname + '/public'));
app.get("/api", (req, res) => {
    res.json({res:"not done yet tawfik"})
})

app.get("/", (req, res) => {
    res.json({res:"not done yet"})
})

var httpsServer = https.createServer(credentials, app)
var httpServer = http.createServer(app);


httpServer.listen(port, () => {
   console.log("listenig ... http://" + hostname() +":"+port  )
})
httpsServer.listen(portHttps, () => {
    console.log("listenig ... https://" + hostname() +":"+portHttps  )
 })