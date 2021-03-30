function assignments (app){
    app.get('/assignments', (_, res) => {
        res.send(`Path activated with GET method and assignments resource; assignments values must be returned.`)
    });
}

module.exports = assignments;




