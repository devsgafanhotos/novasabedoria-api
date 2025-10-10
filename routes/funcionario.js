const funcionarioRouter = require("express").Router();
const { funcionarioControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO funcionario E CADASTRA NO BANCO
 * @route /funcionario/cadastrar
 */
funcionarioRouter.post("/cadastrar", funcionarioControllers.cadastrarFuncionario);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM funcionario EXISTENTE PARA EDITA-LO
 * @route /funcionario/editar
 */
funcionarioRouter.put("/editar", funcionarioControllers.editarFuncionario);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM funcionario EXISTENTE PARA EDITA-LO
 * @route /funcionario/editar
 */
funcionarioRouter.put("/editarSenha", funcionarioControllers.editarSenhaFuncionario);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM funcionario EXISTENTE PARA EDITA-LO
 * @route /funcionario/editar
 */
funcionarioRouter.delete("/deletar", funcionarioControllers.deletarFuncionario);

/**
 * @description ROTA QUE RETORNA UM funcionario ESPECÍFICO
 * @route /funcionario/perfil?id=id
 */
funcionarioRouter.get("/perfil", funcionarioControllers.perfilFuncionario);

/**
 * @description ROTA QUE RETORNA TODOS OS Funcionarios EXISTENTES
 * @route /funcionario/listar
 */
funcionarioRouter.get("/listar", funcionarioControllers.listarFuncionarios);

module.exports = funcionarioRouter;
