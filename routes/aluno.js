const alunoRouter = require("express").Router();
const { alunoControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO aluno E CADASTRA NO BANCO
 * @route /aluno/cadastrar
 */
alunoRouter.post("/cadastrar", alunoControllers.cadastrarAluno);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO aluno E CADASTRA NO BANCO
 * @route /aluno/login
 */
alunoRouter.post("/login", alunoControllers.loginAluno);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM aluno EXISTENTE PARA EDITA-LO
 * @route /aluno/editar
 */
alunoRouter.put("/editar", alunoControllers.editarAluno);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM aluno EXISTENTE PARA EDITA-LO
 * @route /aluno/editar
 */
alunoRouter.put("/editarsenha", alunoControllers.editarSenhaAluno);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM aluno EXISTENTE PARA EDITA-LO
 * @route /aluno/editar
 */
alunoRouter.delete("/deletar", alunoControllers.deletarAluno);

/**
 * @description ROTA QUE RETORNA UM aluno ESPECÍFICO
 * @route /aluno/perfil?id=id
 */
alunoRouter.get("/perfil", alunoControllers.perfilAluno);

/**
 * @description ROTA QUE RETORNA TODOS OS Alunos EXISTENTES
 * @route /aluno/listar
 */
alunoRouter.get("/listar", alunoControllers.listarAlunos);

module.exports = alunoRouter;
