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
 * @description INTEGRAÇÃO DA ROTA DE usuario AO ROTEADOR PRINCIPAL
 */
const usuarioRoutes = require("./usuario");
router.use("/usuario", usuarioRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE funcionario AO ROTEADOR PRINCIPAL
 */
const funcionarioRoutes = require("./funcionario");
router.use("/funcionario", funcionarioRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE aluno AO ROTEADOR PRINCIPAL
 */
const alunoRoutes = require("./aluno");
router.use("/aluno", alunoRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE turma AO ROTEADOR PRINCIPAL
 */
const turmaRoutes = require("./turma");
router.use("/turma", turmaRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE receita AO ROTEADOR PRINCIPAL
 */
const receitaRoutes = require("./receita");
router.use("/receita", receitaRoutes);

module.exports = { router };
