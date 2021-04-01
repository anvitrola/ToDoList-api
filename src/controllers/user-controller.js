function user (app){
    app.get('/user', (_, res) => {
        res.send(`Path activated with GET method and user resource; user values must be returned.`)
    });
    app.post('/user', (_, res) => {
        res.send(`User POST path activated: user added to database `)
    });
}

module.exports = user;


