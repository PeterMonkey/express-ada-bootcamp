const express = require('express');
const app = express();

const PORT = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(3000, () => {
    console.log(`server run in http://localhost:${PORT}`)
});