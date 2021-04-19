const User = require("../models/user-model"); 
const DAO = require("../DAO/users-dao.js");

module.exports = (app, db) => {
    const usersData = new DAO(db);

    app.get("/user", async (_, res) => {
        await usersData.get()
            .then(rows => res.send(rows))
            .catch(err => res.send(`[ERROR][status: ${err.status}]`));
    });

    app.post("/user", async (req, res) => {
        let {name, email, password} = req.body; //destructuring body 

        const user = new User(
            name, 
            email, 
            password
        ); //creating new profile

        if (name && email && password){
            await usersData.insert(user.profile())
                .then((_) => res.send(`User succesfully added to database`))
                .catch(err => res.send(`[ERROR][status: ${err.status}]`))
        }
    });

    app.delete("/user/:id", async (req, res) => {
        await usersData.delete(req.params.id)
            .then((_) => res.send("User successfully deleted"))
            .catch(err => res.send(`[ERROR][status: ${err.status}]`))
    });

    app.put("/user/:id" , async (req, res) => {
        const {name, email, password} = req.body;

        const updatedUser = {
            name: name,
            email: email,
            password: password
        };

        await usersData.update(updatedUser, req.params.id)
            .then((_) => res.send({message: "User's information sucessfully updated"}))
            .catch(err => res.send({[ERROR]: `${err.status}]`}))
    });
    
    app.get("/user/:id", async (req, res) => {
        await usersData.getUser(req.params.id)
            .then(row => {
                console.log(row);   
            })
            .then(() => {
                res.send(`User ${req.params.id} informations was returned. Check console`);
            })
            .catch(err => res.send(`[ERROR][status: ${err.status}]`))
    }); //bugFix: cannot return data on insomnia. only console. don't know why yet.
}; 
