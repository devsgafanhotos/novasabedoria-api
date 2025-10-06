const funcaoRouter = require("express").Router();
const { funcaoControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO funcao E CADASTRA NO BANCO
 * @route /funcao/cadastrar
 */
funcaoRouter.post("/cadastrar", funcaoControllers.cadastrarFuncao);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM funcao EXISTENTE PARA EDITA-LO
 * @route /funcao/editar
 */
funcaoRouter.put("/editar", funcaoControllers.editarFuncao);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM funcao EXISTENTE PARA EDITA-LO
 * @route /funcao/editar
 */
funcaoRouter.delete("/deletar", funcaoControllers.deletarFuncao);

/**
 * @description ROTA QUE RETORNA UM funcao ESPECÍFICO
 * @route /funcao/perfil?id=id
 */
funcaoRouter.get("/perfil", funcaoControllers.perfilFuncao);

/**
 * @description ROTA QUE RETORNA TODOS OS Funcoes EXISTENTES
 * @route /funcao/listar?tipo=tipo
 */
funcaoRouter.get("/listar", funcaoControllers.listarFuncoes);

module.exports = funcaoRouter;
