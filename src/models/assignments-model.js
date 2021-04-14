class Assignments {
    constructor(title, description, status, created_at, user_id){
        this.__title = title,
        this.__description = description,
        this.__status = status,
        this.__created_at = created_at,
        this.__user_id = user_id
    }
    assignment(){
        return {
            title: this.__title,
            description: this.__description,
            status: this.__status,
            created_at: this.__created_at,
            user_id: this.__user_id
        }
    }
}

module.exports = Assignments;