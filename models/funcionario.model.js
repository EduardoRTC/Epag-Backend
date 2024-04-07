const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    ativo : { type: Boolean, default: true},
    nome: { type: String },
    sexo: { type: String, enum: ['M', 'F']},
    nasc: {type: String},
    salarioMaternidade: { type: Boolean, default: false },
    cpf: { type: String, },
    cargo: { type: String, },
    salario: { type: Number },
    comissionado: { type: Boolean, default: false },
    tipoContrato: { type: String, enum: ['CLT', 'PJ', 'ESTAGIO'] },
    numeroFilhos: { type: Number, default: 0 },
    salarioFamilia: { type: Boolean, default: false },
    valeTransporte: { type: Boolean, default: false },
    contribuicaoSindical: { type: Boolean, default: false },
    jornadaTrabalho: { type: String, enum: ['TEMPO_INTEGRAL', 'MEIO_PERIODO'] },
    insalubridade: { type: String, enum: ['MINIMO', 'MEDIO', 'MAXIMO'] },
    adicionalPericulosidade: { type: Boolean, default: false },
    auxilioCreche: { type: Boolean, default: false },
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;
