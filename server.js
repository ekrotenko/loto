const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.port || 5000;

app.listen(port);

console.log("Servier is listening port", port);
