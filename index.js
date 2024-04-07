const express = require("express");
const app = express();
const port = 3500;
const mongoose = require("mongoose")
const funcionarioRoutes = require("./routes/routes");
const cors = require('cors');


app.use(express.json());
app.use(cors()); // Use o middleware cors
app.use("/api", funcionarioRoutes);


mongoose
    .connect("mongodb+srv://admin:testedb123@backenddb.nbarlhu.mongodb.net/api?retryWrites=true&w=majority&appName=BackendDB")
    .then(async () => {
        console.log("Connected!");
            // Iniciar o servidor apenas após a verificação
            app.listen(port, () => {
                console.log(`Rodando na porta ${port}`);
            });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });
