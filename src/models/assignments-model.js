class Assignments {
    constructor(title, createdDate, description){
        this.__title = title,
        this.__createdDate = createdDate,
        this.__description = description,
        this.__status = false
    }
    get title (){
        return this.__title;
    }
    get createdDate (){
        return this.__createdDate;
    }
    get description (){
        return this.__description;
    }
    get status (){
        return this.__status;
    }
    assignment(){
        return {
            title: this.title,
            limitDate: this.createdDate,
            description: this.description,
            status: this.status
        }
    }
}

module.exports = Assignments;