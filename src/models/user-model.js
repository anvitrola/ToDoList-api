class User {
    constructor (name, username, email, password){
        this.__id = 1,
        this.__name = name,
        this.__username = username,
        this.__email = email
        this.__password = password
    }
    get id (){
        return this.__id;
    }
    get name (){
        return this.__name;
    }
    get username (){
        return this.__username
    }
    get email (){
        return this.__email
    }
    profile (){
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            email: this.email
        }
    }
}

module.exports = User;