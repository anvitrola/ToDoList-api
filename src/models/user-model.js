class User {
    constructor (name, email, password){
        this.__name = name,
        this.__email = email
        this.__password = password
    }
    profile (){
        return {
            name: this.__name,
            email: this.__email,
            password: this.__password
        }
    }
}

module.exports = User;