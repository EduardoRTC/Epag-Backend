const express = require("express");
const router = express.Router();
const Funcionario = require("../models/funcionario.model.js");

// Endpoint para verificar se há mais ou menos de 30 mulheres no banco

router.get("/verificarMulheres", async (req, res) => {
    try {
        const countMulheres = await Funcionario.countDocuments({ sexo: 'F' });

        if (countMulheres > 30) {
            res.status(200).json({ message: 'Há mais de 30 mulheres no banco.' });
        } else {
            res.status(200).json({ message: 'Há menos de 30 mulheres no banco.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar a quantidade de mulheres no banco.' });
    }
});

// Endpoint para criar um novo funcionário
router.post("/", async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body);
        res.status(201).json(funcionario); // Status 201 para Created
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para buscar todos os funcionários
router.get("/", async (req, res) => {
    try {
        const funcionarios = await Funcionario.find({});
        res.status(200).json(funcionarios); // Retorna array de funcionários
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para buscar um funcionário por index
router.get("/index/:index", async (req, res) => {
    try {
        const funcionario = await Funcionario.findOne({ index: req.params.index });
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para atualizar um funcionário por index
router.put("/index/:index", async (req, res) => {
    try {
        const funcionario = await Funcionario.findOneAndUpdate({ index: req.params.index }, req.body, { new: true });
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para alterar o status de um funcionário por index
router.put("/status/:index", async (req, res) => {
    const { index } = req.params;
    const novoStatus = req.query.novoStatus;

    try {
        const funcionario = await Funcionario.findOne({ index });
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }

        // Alterar o status do funcionário
        funcionario.ativo = novoStatus;
        await funcionario.save();

        res.status(200).json({ msg: "Status do funcionário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


// Endpoint para deletar um funcionário por index
router.delete("/index/:index", async (req, res) => {
    try {
        const funcionario = await Funcionario.findOneAndDelete({ index: req.params.index });
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json({ msg: "Funcionário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
