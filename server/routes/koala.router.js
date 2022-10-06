const express = require('express');
const pool = require('../modules/pool');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding new koala', newKoala);

    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, newKoala.notes])
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