const planoRouter = require("express").Router();
const { planoControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO PLANO E CADASTRA NO BANCO
 * @route /plano/cadastrar
 */
planoRouter.post("/cadastrar", planoControllers.cadastrarPlano);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM PLANO EXISTENTE PARA EDITA-LO
 * @route /plano/editar
 */
planoRouter.put("/editar", planoControllers.editarPlano);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM PLANO EXISTENTE PARA EDITA-LO
 * @route /plano/editar
 */
planoRouter.delete("/deletar", planoControllers.deletarPlano);

/**
 * @description ROTA QUE RETORNA UM PLANO ESPECÍFICO
 * @route /plano/perfil?id=id
 */
planoRouter.get("/perfil", planoControllers.perfilPlano);

/**
 * @description ROTA QUE RETORNA TODOS OS PLANOS EXISTENTES
 * @route /plano/listar?tipo=tipo
 */
planoRouter.get("/listar", planoControllers.listarPlanos);


module.exports = planoRouter;
