const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database.js');

const app = express();

const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//traer usuarios
app.get('/user/', async (req, res) => {
    try {  
        const query = await connection.query(`SELECT * FROM user`)
        if(query){
            res.status(200).json({
                ok: true,
                message: query[0]
            })
        }
    } catch (error) {
        console.error(error)
    }

});

//traer usuarios por id
app.get('/user/:id', async (req, res) => {
    try {  
        let {id} = req.params
        const query = await connection.query(`SELECT * FROM user WHERE id=${id}`)
        if(query[0].length === 0){
            res.status(400).json({
                ok: false,
                message: 'Not Found'
            })
        }
        else {
            res.status(200).json({
                ok: true,
                data: query[0]
            })
        }

    } catch (error) {
        console.error(error)
    }

});

//crear usuarios
app.post('/user', async (req, res) => {
    let {name, lastname, age, job} = req.body;
    await connection.query(`INSERT INTO user (name, lastname, age, job) VALUES (?, ?, ?, ?)`,[name, lastname, age, job])
    res.status(200).json({
        ok: true,
        data: {
            name,
            lastname,
            age,
            job
        }
    })
    
});

// actualizar usuarios
app.put('/user/:id', async (req, res) => {
    let id = req.params.id;
    let {name, lastname} = req.body;
    await connection.query(`UPDATE user SET name = ?, lastname = ? WHERE id = ?`, [name, lastname, id])
    res.status.apply(200).json({
        ok: true,
        message: `User with id: ${id} updated`
    })
});

//borrar usuarios
app.delete('/user/:id', async (req, res) => {
    let id = req.params.id;
    await connection.query(`DELETE FROM user WHERE id = ${id}`)
    res.status(200).json({
        ok: true,
        message: `User with id: ${id}, deleted`
    })

})

app.listen(3000, () => {
    console.log(`server run in http://localhost:${PORT}`)
});