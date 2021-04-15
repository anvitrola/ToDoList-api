const User = require("../models/user-model"); 
const DAO = require("../DAO/users-dao.js");

module.exports = (app, db) => {
    const usersData = new DAO(db);

    app.get("/user", (_, res) => {
        usersData.get()
            .then(rows => res.send(rows))
            .catch(err => res.send(`[ERROR][status: ${err.status}]`));
    });

    app.post("/user", (req, res) => {
        let body = req.body;
        const user = new User(
            body.name, 
            body.email, 
            body.password
        ); //creating new profile

        if (body.name && body.email && body.password){
            usersData.insert(user.profile())
                .then(success => res.send(`User succesfully added to database`))
                .catch(err => res.send(`[ERROR][status: ${err.status}]`))
        }
    });

    app.delete("/user/:id", (req, res) => {
        usersData.delete(req.params.id)
            .then(success => res.send("User successfully deleted"))
            .catch(err => res.send(`[ERROR][status: ${err.status}]`))
    });

    app.put("/user/:id" , (req, res) => {
        const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        usersData.update(updatedUser, req.params.id)
            .then(success => res.send("User's information successfully updated"))
            .catch(err => res.send(`[ERROR][status: ${err.status}]`))
    });
    
    app.get("/user/:id", (req, res) => {
        usersData.getUser(req.params.id)
            .then(row => {
                console.log(row);   
            })
            .then(() => {
                res.send(`User ${req.params.id} informations was returned. Check console`);
            })
            .catch(err => res.send(`[ERROR][status: ${err.status}]`))
    }); //bugFix: cannot return data on insomnia. only console. don't know why yet.
}; 
