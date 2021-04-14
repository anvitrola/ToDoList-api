const Assignment = require('../models/assignments-model'); 
const db = require("../infra/sqlite-db"); 
const DAO = require("../DAO/assignments-dao");

const assignmentsData = new DAO(db);

module.exports = app => {
    app.get('/assignments', (_, res) => {
        assignmentsData.get()
            .then(rows => res.send(rows))
            .catch(err => res.send(`[ERROR][STATUS: ${err.status}]`))
    });
    app.post('/assignments', (req, res) => {
        let body = req.body; 
        const assignment = new Assignment(
            body.title, 
            body.description, 
            body.status, 
            body.created_at, 
            body.user_id
        ); 

        if (body.title && body.description && body.status && body.created_at && body.user_id){
            assignmentsData.insert(assignment.assignment())
                .then(() => res.send("Assignment successfully added to database"))
                .catch(err => res.send(`[ERROR][STATUS: ${err.status}]`))
        } 
    });
    app.delete("/assignments/:id", (req, res) => {
        assignmentsData.delete(req.params.id)
            .then(() => res.send("Assignment successfully deleted"))
            .catch((err) => res.send(`[ERROR][status]: ${err.status}`))
    });
    app.put("/assignments/:id", (req, res) => {
        let body = req.body;

        const updatedAssignment = {
            title: body.title,
            description: body.description,
            status: body.status,
            created_at: body.created_at,
            user_id: body.user_id
        }

        assignmentsData.update(updatedAssignment, req.params.id)
            .then(() => res.send("Assignment was successfully updated"))
            .catch((err) => res.send(`[ERROR][status]: ${err.status}`))
    });
    app.get("/assignments/:id", (req, res) => {
        assignmentsData.getAssignment(req.params.id)
            .then((row) => console.log(row))
            .then(() => res.send(`Assignment ${req.params.id} informations was returned. check console`))
            .catch((err) => res.send(`[ERROR][status]: ${err.status}`))
    });
};




