class UsersDAO {
    constructor(db){
        this.db = db;
    };
    get() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM users`, (err, rows) => {
                err ? reject(err) : resolve(rows)
            })
        })
    };
    insert(newUser) {
        let sql = `
            INSERT INTO users 
            (name,
            email,
            password) VALUES (?,?,?)
        `;

        let params = [
            newUser.name, 
            newUser.email, 
            newUser.password
        ];

        return new Promise((resolve, reject) => {
            this.db.run(
                sql, 
                params, 
                (err, success) => {err ? reject(err) : resolve(success)}
            )
        })
    };
    delete(userId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                `DELETE FROM users WHERE id = (?)`, 
                userId, 
                (err, success) => {err ? reject(err) : resolve(success)}
            )
        })
    };
    update(updatedUser, userId) {
        let sql = `
        UPDATE users SET 
        name = (?),
        email = (?),
        password = (?)
        WHERE id = (?)
        `;
        
        let params = [
            updatedUser.name, 
            updatedUser.email, 
            updatedUser.password, 
            userId
        ];

        return new Promise((resolve, reject) =>{
            this.db.run(
                sql, 
                params, 
                (err, success) => {err ? reject(err) : resolve(success)}
            )
        })
    };
    getUser(userId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT name, email FROM users WHERE id = (?)`,
                userId,
                (err, row) => err ? reject(err) : resolve(row)
            )
        })
    };
};

module.exports = UsersDAO;