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

koalaRouter.delete('/:id', (req, res) => {
    console.log('in delete with id:', req.params.id);
    const koalaId = req.params.id;

    const sqlText = `DELETE FROM "koalas" WHERE "id" = $1;`
    const sqlParams = [koalaId];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('delete koala failed', err);
            res.sendStatus(500);
          });
});

module.exports = koalaRouter;