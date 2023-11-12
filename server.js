const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 8081

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_node"
})

app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    return response.json("Starting the NODE SERVER...");
});

app.listen(port, () => {
    console.log('Listening to port ' + port)
});

app.get('/users', (request, response) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (error, data) => {
        if(error) return response.json(error);
        return response.json(data);
    })
})

app.get('/add_user', (request, response) => {
    const {name, phone, email} = request.body;
    const sql = "INSERT INTO users (name, phone, email) VALUES (?,?,?)";
    db.query(sql, [name, phone, email], (error, result) => {
        if (error) throw (error);
        response.send('User added')
    })
})
