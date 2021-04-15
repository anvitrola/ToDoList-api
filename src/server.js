const chalk = require("chalk"); //painting terminal to becomes easier to find errors
const customExpress = require("./config/customExpress"); //requiring server configurations (customExpress)
const app = customExpress();
const db = require("./infra/sqlite-db"); 

const userController = require("./controllers/user-controller")(app, db);
const assignmentsController = require("./controllers/assignments-controller")(app, db);

app.use((req, _, next) => {
    console.log(chalk.yellow(`[INFO]: Request ${req.method} type.`));
    next();
}); //announcing the type of request

//openning the server, exposing port etc.
app.listen("2000", () => console.log(chalk.green("[SUCESSO]: Example app listening at http://localhost:2000")));