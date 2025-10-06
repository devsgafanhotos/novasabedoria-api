/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE PLANOS
 */
const planoControllers = require("./plano");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE DEPARTAMENTOS
 */
const departamentoControllers = require("./departamento");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE funcaoS
 */
const funcaoControllers = require("./funcao");

module.exports = { planoControllers, departamentoControllers, funcaoControllers };
