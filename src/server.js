const chalk = require("chalk"); //painting terminal to becomes easier to find errors
const customExpress = require("./config/customExpress"); //requiring server configurations (customExpress)
const app = customExpress();

app.use((req, _, next) => {
    console.log(chalk.yellow(`[INFO]: Request ${req.method} type.`));
    next();
}); //announcing the type of request

//openning the server, exposing port etc.
app.listen("2000", () => console.log(chalk.green("[SUCESSO]: Example app listening at http://localhost:2000")));