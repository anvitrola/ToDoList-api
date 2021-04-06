//Setting server tools/frameworks

const express = require("express"); //framework that builds the server
const consign = require("consign"); // framework that put all the things together
const bodyParser = require("body-parser"); // framework that converts the request to the server language

module.exports = () => {
    const app = express();
    
    app.use(bodyParser.urlencoded({extended: true})); //converting Form answers to server language
    app.use(bodyParser.json()); //converting answers in general to json

    app.use(express.static("public")); //turning public directory real public

    consign() // here, consign includes all controllers into the server
    .include("src/controllers")
    .into(app);

    return app
}