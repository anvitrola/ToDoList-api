const Assignment = require('../models/assignments-model'); 
const DAO = require("../DAO/assignments-dao");

module.exports = (app, db) => {
    const assignmentsData = new DAO(db);

    app.get('/assignments', async (_, res) => {
        await assignmentsData.get()
            .then(rows => res.send(rows))
            .catch(err => res.send({ERROR: err.status}))
    });

    app.post('/assignments', async (req, res) => {
        let {title, description, status, created_at, user_id} = req.body; 

        const assignment = new Assignment(
            title, 
            description, 
            status, 
            created_at, 
            user_id
        ); 

        if (title && description && status && created_at && user_id){
            await assignmentsData.insert(assignment.assignment())
                .then(() => res.send({message: "Assignment successfully added to database"}))
                .catch(err => res.send({ERROR: err.status}))
        } 
    });

    app.delete("/assignments/:id", async (req, res) => {
        await assignmentsData.delete(req.params.id)
            .then((_) => res.send({message: "Assignment successfully deleted"}))
            .catch((err) => res.send({ERROR: err.status}))
    });

    app.put("/assignments/:id", async (req, res) => {
        let {title, description, status, created_at, user_id} = req.body;

        const updatedAssignment = {
            title: title,
            description: description,
            status: status,
            created_at: created_at,
            user_id: user_id
        }

        await assignmentsData.update(updatedAssignment, req.params.id)
            .then((_) => res.send({message: "Assignment was successfully updated"}))
            .catch((err) => res.send({ERROR: err.status}))
    });

    app.get("/assignments/:id", async (req, res) => {
        await assignmentsData.getAssignment(req.params.id)
            .then((row) => console.log(row))
            .then(() => res.send({message: "Assignment was returned. check console"}))
            .catch((err) => res.send({ERROR: err.status}))
    });
};




