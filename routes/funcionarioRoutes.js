const express = require("express");
const router = express.Router();
const Funcionario = require("../models/funcionario.model.js");

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

// Endpoint para buscar um funcionário por ID
router.get("/:id", async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para atualizar um funcionário por ID
router.put("/:id", async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Endpoint para deletar um funcionário por ID
router.delete("/:id", async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ msg: "Funcionário não encontrado" });
        }
        res.status(200).json({ msg: "Funcionário deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
