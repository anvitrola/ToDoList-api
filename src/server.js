const chalk = require("chalk"); //painting terminal to becomes easier to find errors
const customExpress = require("./config/customExpress"); //requiring server configurations (customExpress)
const connection = require("./infra/bd-connection");
const Tables = require("./infra/tables");

connection.connect((error) => {
    if (error){
        console.log(error)

    } else{
        console.log(chalk.green("successfully connected!"));
        Tables.init(connection);
        const app = customExpress();
        
        app.use((req, _, next) => {
            console.log(chalk.yellow(`[INFO]: Request ${req.method} type.`));
            next();
        }); //announcing the type of request
        
        //openning the server, exposing port etc.
        app.listen("2000", () => console.log(chalk.green("[SUCESSO]: Example app listening at http://localhost:2000")));
    }
});
