const User = require("../models/user-model"); //importing user model
const usersList = require("../config/bd.js").users; //importing users table on "database"
const db = require("../infra/sqlite-db");  //importing database
const DAO = require("../DAO/users-dao.js");
const usersData = new DAO(db);

module.exports = app => {
    app.get("/user", (_, res) => {
        usersData.showUsers(res);
    });

    app.post("/user", (req, res) => {
        let body = req.body;
        const user = new User(body.name, body.email, body.password); //creating new user

        //checking empty spaces
        if (body.name && body.email && body.password){
            usersData.insertUser(res, user.profile())
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

    app.patch("/user/:email", (req, res) =>{
        usersList.filter((object) =>{
            if (object.email == req.params.email){
                object.email = req.body.email
            }
        })
        res.send({status: "User's email was sucessully updated"})
    }); //uploading user's email. we use patch, not put, to upload just a few fields
}; 
