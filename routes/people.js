const mysqlConection = require('../connection');
const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) =>{
    mysqlConection.query("select * from people", (err, rows, fields) => {
        if(!err) res.send(rows);
        else console.log('Error occured... ',err);
    });
});

module.exports = Router;