import * as pg from "pg"
import * as express from "express"
import { hostname } from "os"


import * as swaggerUi from  'swagger-ui-express';
const swaggerDocument = require('./swagger.json');

var app = express()
let port = 3010

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
    res.json({res:"not done yet"})
})

app.get("/", (req, res) => {
    res.json({res:"not done yet"})
})

app.listen(port, () => {
   console.log("listenig ... http://" + hostname() +":"+port  )
})