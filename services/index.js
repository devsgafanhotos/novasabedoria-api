/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE PLANOS
 */
const planoServices = require("./plano");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE DEPARTAMENTOS
 */
const departamentoServices = require("./departamento");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE FUNCOES
 */
const funcaoServices = require("./funcao");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE disciplina
 */
const disciplinaServices = require("./disciplina");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE usuario
 */
const usuarioServices = require("./usuario");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE funcionario
 */
const funcionarioServices = require("./funcionario");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE aluno
 */
const alunoServices = require("./aluno");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE turma
 */
const turmaServices = require("./turma");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE receita
 */
const receitaServices = require("./receita");

module.exports = {
    planoServices,
    departamentoServices,
    funcaoServices,
    disciplinaServices,
    usuarioServices,
    funcionarioServices,
    alunoServices,
    turmaServices,
    receitaServices,
};
