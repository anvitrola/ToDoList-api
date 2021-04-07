const User = require("../models/user-model"); //importing user model
const usersList = require("../config/bd.js").users; //importing users table on "database"

module.exports = app => {
    app.get("/user", (_, res) => {
        res.send(usersList); //sending list with all users 
    });

    app.post("/user", (req, res) => {
        let body = req.body;
        const user = new User(body.name, body.username, body.email, body.password); //creating new user

        //if there is not empty spaces, then push new user to it"s table on database
        if (body.name && body.username && body.email && body.password){
            usersList.push(user.profile());
            res.send({status: "User created succesfully!"}); //"200" msg
        } else{
            res.send("Request error!");
        }
    });

    app.get("/user/:email", (req, res) =>{
        usersList.filter((object) => {
           
            if(object.email == req.params.email){
                res.send(object)
            } else{
                res.send({status: "Cannot find this user."})
            }
        })
    }); //searching for an user in database using it's email, which is GET param (:email)

    app.delete("/user/:email", (req, res) =>{
        usersList.forEach((object, position) =>{
            if (object.email == req.params.email){
                usersList.splice(position, 1); 
            }
        })
        res.send({status: "User successfully deleted"});
    }); //checking which user's email matches the one to be deleted. ForEach checks the object and splice deletes using object's position on Array (list of users)
}; 
