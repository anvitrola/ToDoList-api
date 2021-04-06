class Assignments {
    constructor(title, limitDate, description){
        this.__title = title,
        this.__limitDate = limitDate,
        this.__description = description,
        this.__status = false
    }
    get title (){
        return this.__title;
    }
    get limitDate (){
        return this.__limitDate;
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
            limitDate: this.limitDate,
            description: this.description,
            status: this.status
        }
    }
}

module.exports = Assignments;