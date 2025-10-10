const disciplinaRouter = require("express").Router();
const { disciplinaControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO disciplina E CADASTRA NO BANCO
 * @route /disciplina/cadastrar
 */
disciplinaRouter.post("/cadastrar", disciplinaControllers.cadastrarDisciplina);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM disciplina EXISTENTE PARA EDITA-LO
 * @route /disciplina/editar
 */
disciplinaRouter.put("/editar", disciplinaControllers.editarDisciplina);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM disciplina EXISTENTE PARA EDITA-LO
 * @route /disciplina/editar
 */
disciplinaRouter.delete("/deletar", disciplinaControllers.deletarDisciplina);

/**
 * @description ROTA QUE RETORNA UM disciplina ESPECÍFICO
 * @route /disciplina/perfil?id=id
 */
disciplinaRouter.get("/perfil", disciplinaControllers.perfilDisciplina);

/**
 * @description ROTA QUE RETORNA TODOS OS disciplinaS EXISTENTES
 * @route /disciplina/listar
 */
disciplinaRouter.get("/listar", disciplinaControllers.listarDisciplinas);

module.exports = disciplinaRouter;
