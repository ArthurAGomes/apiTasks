const express = require('express');
const cors = require('cors');
const router = require('./src/routes/routes');
const app = express();
const port = 3000;
require('dotenv').config();
app.use(cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE"
}));
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

