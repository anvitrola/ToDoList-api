class UsersDAO {
    constructor(db){
        this.db = db;
    };

    async get() {
        try {
            return await new Promise((resolve, reject) => {
                this.db.all(`SELECT * FROM users`, (err, rows) => {
                    err ? reject(err) : resolve(rows)
                })
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async insert(newUser) {
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

        try {
            return await new Promise((resolve, reject) => {
                this.db.run(
                    sql, 
                    params, 
                    (err, success) => {err ? reject(err) : resolve(success)}
                )
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async delete(userId) {
        try{
            return await new Promise((resolve, reject) => {
                this.db.run(
                    `DELETE FROM users WHERE id = (?)`, 
                    userId, 
                    (err, success) => {err ? reject(err) : resolve(success)}
                )
            })
        } catch (err) {
            throw new Error(err)
        }
    };

    async update(updatedUser, userId) {
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

        try {
            return await new Promise((resolve, reject) =>{
                this.db.run(
                    sql, 
                    params, 
                    (err, success) => {err ? reject(err) : resolve(success)}
                )
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async getUser(userId) {
        try{
            return await new Promise((resolve, reject) => {
                this.db.get(
                    `SELECT name, email FROM users WHERE id = (?)`,
                    userId,
                    (err, row) => err ? reject(err) : resolve(row)
                )
            })
        } catch (err) {
            throw new Error(err)
        }
    };
};

module.exports = UsersDAO;