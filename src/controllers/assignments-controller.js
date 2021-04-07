const Assignment = require('../models/assignments-model'); //importing assignment model
const assignmentsList = require('../config/bd.js').assignments; //importing assignments table on "database"

module.exports = app => {
    app.get('/assignments', (_, res) => {
        res.send(assignmentsList); //sending list with all assignments
    });
    
    app.post('/assignments', (req, res) => {
        let body = req.body; 
        const assignment = new Assignment(body.title, body.limitDate, body.description); //creating new assignment

        //if there is not empty spaces, then push new assignment to it's table on database
        if (body.title && body.limitDate && body.description){
            assignmentsList.push(assignment.assignment());
            res.send({status: 'Assignment added succesfully!'}); //"200" msg
        } else {
            res.send("Request error!");
        }
    });

    app.get("/assignments/:title", (req, res) =>{
        assignmentsList.filter((object) => {
           
            if(object.title == req.params.title){
                res.send(object)
            } else{
                res.send({status: "ERROR: cannot find this assignment."})
            }
        })
    }); //searching for an assignment in database through it's title, which is GET param (:title)

    app.delete("/assignments/:title", (req, res) =>{
        assignmentsList.forEach((object, position) =>{
            if (object.title == req.params.title){
                assignmentsList.splice(position, 1); 
            }
        })
        res.send({status: "User successfully deleted"});
    });//checking which assignment title matches the one to be deleted
};




