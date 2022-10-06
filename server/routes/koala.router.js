const express = require('express');
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


// PUT


// DELETE

module.exports = koalaRouter;