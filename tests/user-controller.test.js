const chalk = require('chalk')
const request = require('supertest');

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../src/infra/database.db');

const controller = require('../src/controllers/user-controller')(app, db);

request(app)
    .get('/user')
    .expect(200)
    .end((err, res) => {
        if(err) throw(err)
        else console.log(chalk.green("Your test PASSED!!!"))
    });

