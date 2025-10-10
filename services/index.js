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

module.exports = {
    planoServices,
    departamentoServices,
    funcaoServices,
    disciplinaServices,
    usuarioServices,
    funcionarioServices,
};
