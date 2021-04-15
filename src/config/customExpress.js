//Setting server tools/frameworks
const express = require("express"); //framework that builds the server
const bodyParser = require("body-parser"); // framework that converts the request to the server language
const cors = require("cors");

module.exports = () => {
    const app = express();
    
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true})); //converting Form answers to server language
    app.use(bodyParser.json()); //converting answers in general to json

    app.use(express.static("public")); //turning public directory real public

    return app
}