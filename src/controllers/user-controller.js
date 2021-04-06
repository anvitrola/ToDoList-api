const User = require('../models/user-model'); //importing user model
const usersList = require('../config/bd.js').users; //importing users table on "database"

module.exports = (app) => {
    app.get('/user', (_, res) => {
        res.send(usersList); //sending list with all users 
    });

    app.post('/user', (req, res) => {
        let body = req.body;
        const user = new User(body.name, body.username, body.email, body.password); //creating new user

        //if there is not empty spaces, then push new user to it's table on database
        if (body.name && body.username && body.email && body.password){
            usersList.push(user.profile());
            res.send({status: 'User created succesfully!'}); //"200" msg
        } else{
            res.send("Request error!");
        }
    });
};


//const{name, username, email, password} = req.body;
