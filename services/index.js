/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE PLANOS
 */
const planoServices = require("./plano");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE DEPARTAMENTOS
 */
const departamentoServices = require("./departamento");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE funcaoS
 */
const funcaoServices = require("./funcao");

module.exports = { planoServices, departamentoServices, funcaoServices };