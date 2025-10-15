const turmaRouter = require("express").Router();
const { turmaControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO turma E CADASTRA NO BANCO
 * @route /turma/cadastrar
 */
turmaRouter.post("/cadastrar", turmaControllers.cadastrarTurma);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM turma EXISTENTE PARA EDITA-LO
 * @route /turma/editar
 */
turmaRouter.put("/editar", turmaControllers.editarTurma);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM turma EXISTENTE PARA EDITA-LO
 * @route /turma/editar
 */
turmaRouter.delete("/deletar", turmaControllers.deletarTurma);

/**
 * @description ROTA QUE RETORNA UM turma ESPECÍFICO
 * @route /turma/perfil?id=id
 */
turmaRouter.get("/perfil", turmaControllers.perfilTurma);

/**
 * @description ROTA QUE RETORNA TODOS OS turmaS EXISTENTES
 * @route /turma/listar
 */
turmaRouter.get("/listar", turmaControllers.listarTurmas);

module.exports = turmaRouter;
