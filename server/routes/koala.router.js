const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


// DELETE

Router.delete('/:id', (req, res) => {
    console.log('in delete with id:' req.params.id);
    const koalaId = req.params.id;

})

module.exports = koalaRouter;