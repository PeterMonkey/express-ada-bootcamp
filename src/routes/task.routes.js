const express = require('express')
const tokenVerify = require('../middlewares/tokenVerify')
const connection = require('../../database/database')

const app = express()


//crear tarea
app.post('/task', tokenVerify, async (req, res) => {
    let {name, description, checked} = req.body;
    let {id} = req.user
    await connection.query(`INSERT INTO task (name, description, checked, user_id) VALUES (?, ?, ?, ?)`,[name, description, checked, id])
    res.status(200).json({
        ok: true,
        data: {
            name,
            description,
            checked,
            user_id: id
        }
    })
    
});

module.exports = app