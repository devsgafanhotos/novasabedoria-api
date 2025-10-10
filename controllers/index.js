/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE PLANOS
 */
const planoControllers = require("./plano");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE DEPARTAMENTOS
 */
const departamentoControllers = require("./departamento");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DEFUNCOES
 */
const funcaoControllers = require("./funcao");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE disciplinaS
 */
const disciplinaControllers = require("./disciplina");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE funcionarioS
 */
const funcionarioControllers = require("./funcionario");

module.exports = {
    planoControllers,
    departamentoControllers,
    funcaoControllers,
    disciplinaControllers,
    funcionarioControllers,
};
