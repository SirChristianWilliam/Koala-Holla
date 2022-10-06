const express = require('express');
const pool = require('../modules/pool');
const koalaRouter = express.Router();
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

// PUT  : Chris is working on this.

koalaRouter.put('/:id',(req,res) => {
    const koalasId = req.params.id;
    console.log('in PUT with id: ', req.params.id);
    let slText = ``;
    sqlText = `UPDATE "koalas"
                SET "ready_to_transfer" = NOT "ready_to_transfer"
                WHERE "id" = $1`;

const sqlParams = [koalasId];

pool  
  .query(sqlText,sqlParams)
  .then((dbRes) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('update failed',err);
    res.sendStatus(500);
  });

});


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