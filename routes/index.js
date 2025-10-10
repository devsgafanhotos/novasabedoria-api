/**
 * @description OBJECTO DE ROTEAMENTO
 */
const router = require("express").Router();

/**
 * @description INTEGRAÇÃO DA ROTA DE PLANOS AO ROTEADOR PRINCIPAL
 */
const planoRoutes = require("./plano");
router.use("/plano", planoRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE DEPARTAMENTO AO ROTEADOR PRINCIPAL
 */
const departamentoRoutes = require("./departamento");
router.use("/departamento", departamentoRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE DEPARTAMENTO AO ROTEADOR PRINCIPAL
 */
const funcaoRoutes = require("./funcao");
router.use("/funcao", funcaoRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE DISCIPLINA AO ROTEADOR PRINCIPAL
 */
const disciplinaRoutes = require("./disciplina");
router.use("/disciplina", disciplinaRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE funcionario AO ROTEADOR PRINCIPAL
 */
const funcionarioRoutes = require("./funcionario");
router.use("/funcionario", funcionarioRoutes);

module.exports = { router };
