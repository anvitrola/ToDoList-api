/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

//==== Usuários
const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(64),
    email varchar(64),
    password varchar(64)
);`;

const ADD_USERS_DATA = `
INSERT INTO users (
    name, 
    email, 
    password
    ) VALUES 
    ('Eugênio Oliveira', 
    'eugenio.oliveira@bol.com.br', 
    '*******'
    ),
    ('Olívia Ribeiro', 
    'olivia.ribeiro@gmail.com', 
    '********'
    ),
    ('Mirtes Faria Lima', 
    'mirtes_fl@yahoo.com', 
    '********'
    )
`

function criaTabelaUsr() {
    db.run(USERS_SCHEMA, (error)=> {
       if (error) console.log("Error creating users table");
    });
}


function populaTabelaUsr() {
    db.run(ADD_USERS_DATA, (error)=> {
       if (error) console.log("Error adding user's data");
    });
}


//==== ASSIGNMENTS
const ASSIGNMENTS_SCHEMA = `
CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title VARCHAR(64),
    description TEXT,
    status VARCHAR(32),
    created_at VARCHAR(32),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
);`;

const ADD_ASSIGNMENTS_DATA = `
    INSERT INTO assignments (
        title, 
        description, 
        status, 
        created_at, 
        user_id
    ) VALUES 
        ('Yoga', 
        'Practice yoga on Mondays and Fridays', 
        'Continuous', 
        '2021-01-10', 
        2),
        ('Hospital', 
        'Appoinment with Dr. Ayrton on Friday', 
        'TO-DO', 
        '2021-01-13', 
        1),
        ('Pay bills', 
        'Eletricity and water bills', 
        'DOING', 
        '2021-01-02', 
        2),
        ('Grocery', 
        'Make a list of veggetables and fruits', 
        'TO-DO', 
        '2021-01-08', 
        2),
        ('Dentist', 
        'With Dra Andreia on friday', 
        'TO-DO', 
        '2021-01-11', 
        1),
        ('Pay rent', 
        'Every second tuesday of new month', 
        'Continuous', 
        '2021-01-05', 
        3)
`

function criaTabelaAssignments() {
    db.run(ASSIGNMENTS_SCHEMA, (error)=> {
        if(error) console.log("Error creating assignments table");
    });
}


function populaTabelaAssignments() {
    db.run(ADD_ASSIGNMENTS_DATA, (error)=> {
       if (error) console.log("Error adding assignments's data");
    });
}

db.serialize( ()=> {
    criaTabelaUsr();
    populaTabelaUsr();
    criaTabelaAssignments();
    populaTabelaAssignments();
});