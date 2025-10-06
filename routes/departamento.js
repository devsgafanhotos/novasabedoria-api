const departamentoRouter = require("express").Router();
const { departamentoControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO DEPARTAMENTO E CADASTRA NO BANCO
 * @route /departamento/cadastrar
 */
departamentoRouter.post("/cadastrar", departamentoControllers.cadastrarDepartamento);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM DEPARTAMENTO EXISTENTE PARA EDITA-LO
 * @route /departamento/editar
 */
departamentoRouter.put("/editar", departamentoControllers.editarDepartamento);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM DEPARTAMENTO EXISTENTE PARA EDITA-LO
 * @route /departamento/editar
 */
departamentoRouter.delete("/deletar", departamentoControllers.deletarDepartamento);

/**
 * @description ROTA QUE RETORNA UM DEPARTAMENTO ESPECÍFICO
 * @route /departamento/perfil?id=id
 */
departamentoRouter.get("/perfil", departamentoControllers.perfilDepartamento);

/**
 * @description ROTA QUE RETORNA TODOS OS DEPARTAMENTOS EXISTENTES
 * @route /departamento/listar
 */
departamentoRouter.get("/listar", departamentoControllers.listarDepartamentos);


module.exports = departamentoRouter;
