class AssignmentsDAO{
    constructor(db){
        this.db = db
    };

    async get() {
        try{
            return await new Promise((resolve, reject) => {
                this.db.all(
                    `SELECT * FROM assignments`,
                     (err, rows) => { err ? reject (err) : resolve(rows)}
                )
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async insert(newAssignment) {
        let sql = `
        INSERT INTO assignments 
        (title,
        description,
        status,
        created_at,
        user_id) VALUES (?,?,?,?,?)
        `;

        let params = [
            newAssignment.title, 
            newAssignment.description,  
            newAssignment.status, 
            newAssignment.created_at, 
            newAssignment.user_id
        ];

        try{
            return await new Promise((resolve, reject) => {
                this.db.run(
                    sql, 
                    params, 
                    (err, success) =>{err ? reject (err) : resolve(success)}
                )
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async delete(assignmentId) {
        try{
            return await new Promise((resolve, reject) => {
                this.db.run(
                    `DELETE FROM assignments WHERE id = (?)`,
                    assignmentId,
                    (err, success) => {err ? reject(err) : resolve(success)}
                )
            })
        } catch (err){
            throw new Error(err)
        }
    };

    async update(updatedAssignment, assignmentId) {
        let sql = `
        UPDATE assignments SET
        title = (?),
        description = (?),
        status = (?),
        created_at = (?),
        user_id = (?)
        WHERE id = (?)`;

        let params = [
            updatedAssignment.title, 
            updatedAssignment.description, updatedAssignment.status, 
            updatedAssignment.created_at, updatedAssignment.user_id,
            assignmentId
        ]

        try{
            return new Promise((resolve, reject) => {
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
    
    getAssignment(assignmentId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM assignments WHERE id = (?)`,
                assignmentId,
                (err, row) => {err ? reject(err) : resolve(row)}
            )
        })
    };
};

module.exports = AssignmentsDAO;