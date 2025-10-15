/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE PLANOS
 */
const planoControllers = require("./plano");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE DEPARTAMENTOS
 */
const departamentoControllers = require("./departamento");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE FUNCOES
 */
const funcaoControllers = require("./funcao");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE disciplinaS
 */
const disciplinaControllers = require("./disciplina");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE usuario
 */
const usuarioControllers = require("./usuario");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE funcionarioS
 */
const funcionarioControllers = require("./funcionario");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE alunoS
 */
const alunoControllers = require("./aluno");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE turmaS
 */
const turmaControllers = require("./turma");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE receitaS
 */
const receitaControllers = require("./receita");

module.exports = {
    planoControllers,
    departamentoControllers,
    funcaoControllers,
    disciplinaControllers,
    usuarioControllers,
    funcionarioControllers,
    alunoControllers,
    turmaControllers,
    receitaControllers,
};
