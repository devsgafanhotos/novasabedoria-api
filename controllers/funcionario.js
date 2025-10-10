/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE funcionarios
 */
const { funcionarioServices } = require("../services");

class funcionarioControllers {
    /**
     * @description Insere um novo registro de funcionario
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo Funcionario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarFuncionario = async (req, res) => {
        try {
            const { body } = req;

            const response = await funcionarioServices.createFuncionario(body);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );
                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(201).json({
                status: 201,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao cadastrar funcionario... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar funcionario",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de funcionario
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o Funcionario editado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarFuncionario = async (req, res) => {
        try {
            const { body } = req;

            const response = await funcionarioServices.editFuncionario(body);

            // Em caso de insucesso
            if (!response.success) {
                if (response.errors) {
                    // Se tiver informações de erro é porque o erro é interno: 500
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(201).json({
                status: 201,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao editar funcionario... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar funcionario",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita a senha em um registro de funcionario
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o Funcionario editado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarSenhaFuncionario = async (req, res) => {
        try {
            const { id, senhaAntiga, senha } = req.body;
            
            const response = await funcionarioServices.editPassword(id, senhaAntiga, senha);

            // Em caso de insucesso
            if (!response.success) {
                if (response.errors) {
                    // Se tiver informações de erro é porque o erro é interno: 500
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(201).json({
                status: 201,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao editar funcionario... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar funcionario",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de funcionario
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o Funcionario deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarFuncionario = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await funcionarioServices.deleteFuncionario(id);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(404).json({
                    status: 404,
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao deletar funcionario... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar funcionario",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de funcionario
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o Funcionario desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilFuncionario = async (req, res) => {
        try {
            const { id = 0 } = req.query;

            const response = await funcionarioServices.getFuncionario(id);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(404).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao buscar funcionario... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar funcionario",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os Funcionariosexistentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os Funcionariosexistentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarFuncionarios = async (req, res) => {
        try {
            const { id_plano } = req.query;

            const response = await funcionarioServices.getFuncionarios(
                id_plano
            );

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                return res.status(500).json({
                    status: 500,
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro ao listar funcionarios... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar funcionarios",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new funcionarioControllers();

