class Tables {
    init(connection){
        this.connection = connection;
        this.createUSer();
        this.createAssignments();
    }
    createUSer(){
        const sql = `CREATE TABLE IF NOT EXISTS users(
            id int NOT NULL AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            username varchar (25) NOT NULL,
            email varchar (25) NOT NULL,
            password varchar (15) NOT NULL,
            observacoes text,
            PRIMARY KEY(id)
        )`
        this.connection.query(sql, error => error ? console.log(error) : console.log("Table was successfully created."))
    }
    createAssignments(){
        const sql = `CREATE TABLE IF NOT EXISTS assignments(
            id int NOT NULL AUTO_INCREMENT,
            title varchar(50) NOT NULL,
            limit_date date,
            description varchar(100),
            status char(2) NOT NULL,
            PRIMARY KEY(id)
        )`
        this.connection.query(sql, error => error ? console.log(error) : console.log("Table was successfully created."))
    }
}

module.exports = new Tables;