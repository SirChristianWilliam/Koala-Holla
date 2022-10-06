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


// PUT  : Chris is working on this.

koalaRouter.put('/:id',(req,res) => {
    const koalasId = req.params.id;
    console.log('in PUT with id: ', req.params.id);
    let slText = ``;
    sqlText = `UPDATE "koalas"
                SET "ready_to_transfer" = 'true'
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

module.exports = koalaRouter;