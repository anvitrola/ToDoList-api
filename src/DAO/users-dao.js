class UsersDAO {
    constructor(db){
        this.db = db;
    };
    showUsers(res){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM users`, (err, rows) => {
                err ? reject(err) : resolve(rows)
            })
        })
        .then(rows => res.send(rows))
        .catch(err => res.send("ERROR: ", err))
    };
    insertUser(res, newUser){
        let sql = `
            INSERT INTO users (
            name,
            email,
            password
            ) VALUES (?,?,?)
        `;
        let params = [newUser.name, newUser.email, newUser.password];

        return new Promise((resolve, reject) =>{
            this.db.run(sql, params, (err, success) => {
                err ? reject(err) : resolve(success)
            })
        })
        .then(success => res.send(`User succesfully added to database`))
        .catch(err => res.send(`ERROR: `, err))
    }
}

module.exports = UsersDAO;