const chalk = require('chalk');
const app = require('express')();
const port = 2000;

app.get('/', (_, res) => {
    res.send('Utilize /usuario ou /tarefas para navegar pela API.')
})

app.get('/usuario', (_, res) => {
    res.send(`Rota ativada com GET e recurso usuário; valores de usuário devem ser retornados`)
})
app.get('/tarefas', (_, res) => {
    res.send(`Rota ativada com GET e recurso tarefas; valores de tarefas devem ser retornados`)
})

app.listen(port, () => {
    console.log(chalk.green('[SUCESSO]: '),`Example app listening at http://localhost:${port}`);
})