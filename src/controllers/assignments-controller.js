function assignments (app){
    app.get('/assignments', (_, res) => {
        res.send(`Path activated with GET method and assignments resource; assignments values must be returned.`)
    });
    app.post('/assignments', (_, res) => {
        res.send(`Assignments POST path activated: assignment added to database `)
    });
}

module.exports = assignments;




