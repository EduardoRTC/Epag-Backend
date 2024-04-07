const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    index: { type: Number, default: 0, required: true },
    ativo : { type: Boolean, default: true, required: true },
    nome: { type: String, required: true },
    sexo: { type: String, enum: ['M', 'F'], required: true },
    nasc: { type: String, required: true },
    salarioMaternidade: { type: Boolean, default: false },
    cpf: { type: String, required: true },
    cargo: { type: String, required: true },
    salario: { type: Number, required: true },
    comissionado: { type: Boolean, default: false },
    tipoContrato: { type: String, enum: ['CLT', 'PJ', 'ESTAGIO'], required: true },
    numeroFilhos: { type: Number, default: 0 },
    salarioFamilia: { type: Boolean, default: false },
    valeTransporte: { type: Boolean, default: false },
    contribuicaoSindical: { type: Boolean, default: false },
    jornadaTrabalho: { type: String, enum: ['TEMPO_INTEGRAL', 'MEIO_PERIODO'], required: true },
    insalubridade: { type: String, enum: ['MINIMO', 'MEDIO', 'MAXIMO'], required: true },
    adicionalPericulosidade: { type: Boolean, default: false },
    auxilioCreche: { type: Boolean, default: false, required: true },
});

funcionarioSchema.pre('save', async function(next) {
    if (this.isNew) {
      const ultimoDocumento = await Funcionario.findOne().sort({ index: -1 });
      if (ultimoDocumento) {
        this.index = ultimoDocumento.index + 1;
      } else {
        this.index = 1;
      }
    }
    next();
  });

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;
