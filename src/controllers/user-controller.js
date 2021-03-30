function user (app){
    app.get('/user', (_, res) => {
        res.send(`Path activated with GET method and user resource; user values must be returned.`)
    });
}

module.exports = user;


