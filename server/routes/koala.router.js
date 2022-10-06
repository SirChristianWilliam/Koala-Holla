const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding new koala', newKoala);
});

// PUT


// DELETE

module.exports = koalaRouter;