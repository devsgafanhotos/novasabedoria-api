const receitaRouter = require("express").Router();
const { receitaControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO receita E CADASTRA NO BANCO
 * @route /receita/cadastrar
 */
receitaRouter.post("/cadastrar", receitaControllers.cadastrarReceita);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM receita EXISTENTE PARA EDITA-LO
 * @route /receita/editar
 */
receitaRouter.put("/editar", receitaControllers.editarReceita);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM receita EXISTENTE PARA EDITA-LO
 * @route /receita/editar
 */
receitaRouter.delete("/deletar", receitaControllers.deletarReceita);

/**
 * @description ROTA QUE RETORNA UM receita ESPECÍFICO
 * @route /receita/perfil?id=id
 */
receitaRouter.get("/perfil", receitaControllers.perfilReceita);

/**
 * @description ROTA QUE RETORNA TODOS OS receitaS EXISTENTES
 * @route /receita/listar
 */
receitaRouter.get("/listar", receitaControllers.listarReceitas);

module.exports = receitaRouter;
