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

app.get('/', (_, response) => {
    return response.json("Starting the NODE SERVER...");
});

app.listen(port, () => {
    console.log('Listening to port: ' + port)
});

app.get('/users', (_, response) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (error, data) => {
        if (error) {
            response.status(500).json({ error: 'Internal Server Error' });
            throw error;
        }
        if (!data || data.length === 0) {
            response.status(404).json({ message: 'No users found' });
        } else {
            response.json(data);
        }
    });
});

app.get('/users/:id', (request, response) => {
    const id = request.params.id;
    const sql = "SELECT * FROM users where id = ?";
    db.query(sql, [id], (error, data) => {
        if (error) {
            response.status(500).json({ error: 'Internal Server Error' });
            throw error;
        }
        if (!data || data.length === 0) {
            response.status(404).json({ message: 'User not found' });
        } else {
            response.json(data);
        }
    });
});

app.post('/add_user', (request, response) => {
    const { name, phone, email } = request.body;
    const sql = "INSERT INTO users (name, phone, email) VALUES (?,?,?)";
    db.query(sql, [name, phone, email], (error, result) => {
        if (error) {
            response.status(500).json({ error: 'Internal Server Error' });
            throw error;
        }
        response.send('User added');
    });
});

app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            response.status(500).json({ error: 'Internal Server Error' });
            throw error;
        }
        if (result.affectedRows === 0) {
            response.status(404).json({ message: 'User not found' });
            throw error
        } else {
            response.send('User deleted');
        }
    });
});

app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    const { name, phone, email } = request.body;
    const sql = "UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?";
    db.query(sql, [name, phone, email, id], (error, data) => {
        if (error) {
            response.status(500).json({ error: 'Internal Server Error' });
            throw error;
        }
        if (data.affectedRows === 0) {
            response.status(404).json({ message: 'User not found' });
        } else {
            response.send('User updated');
        }
    });
});