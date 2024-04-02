const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Importando rotas de funcionário
const funcionarioRoutes = require("./routes/funcionarioRoutes");

app.use(express.json());

// Middleware para rota de funcionário
app.use("/api/funcionario", funcionarioRoutes);

mongoose
    .connect("mongodb+srv://admin:testedb123@backenddb.nbarlhu.mongodb.net/api?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected!");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch(() => console.log("failed to connect!"));
