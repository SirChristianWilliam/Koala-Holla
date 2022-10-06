const express = require('express');
const pool = require('../modules/pool');
const koalaRouter = express.Router();
const pool = require('../modules/pool');
let koalas = [];
// DB CONNECTION


// GET
koalaRouter.get('/', (req,res) => {
    pool.query(`
        SELECT * FROM "koalas";
    `)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((err) => {
        console.log('GET /songs failed', err);
        res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding new koala', newKoala);

    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`error sending new koala`, error);
            res.sendStatus(500);
        });
});

// PUT


// DELETE

module.exports = koalaRouter;