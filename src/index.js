const chalk = require('chalk');
const app = require('express')();
const port = 2000;

const {conteudo, data} = require('./msg.js');
const user = require('./controllers/user-controller');
const assignments = require('./controllers/assignments-controller');

app.get('/', (_, res) => {
    res.send(`${conteudo}, day: ${data}`)
});

user(app);
assignments(app);

app.listen(port, () => {
    console.log(chalk.green('[SUCESSO]: '),`Example app listening at http://localhost:${port}`);
})