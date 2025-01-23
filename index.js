const express = require('express');
const cors = require('cors');
const router = require('./src/routes/routes');
const app = express();
const port = 3000;

app.use(cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE"
}));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});

