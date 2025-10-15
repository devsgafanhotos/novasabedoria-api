/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE turmas
 */
const { turmaServices } = require("../services");

class turmaControllers {
    /**
     * @description Insere um novo registro de turma
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo turma criada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarTurma = async (req, res) => {
        try {
            const { body } = req;

            const response = await turmaServices.createTurma(body);

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
            console.log(`\n\nErro interno ao cadastrar turma... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar turma",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de turma
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o turma editada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarTurma = async (req, res) => {
        try {
            const { body } = req;

            const response = await turmaServices.editTurma(body);

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
            console.log(`\n\nErro interno ao editar turma... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar turma",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de turma
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o turma deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarTurma = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await turmaServices.deleteTurma(id);

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
            console.log(`\n\nErro interno ao deletar turma... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar turma",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de turma
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o turma desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilTurma = async (req, res) => {
        try {
            const { id = 0 } = req.query;

            const response = await turmaServices.getTurma(id);

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
            console.log(`\n\nErro interno ao buscar turma... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar turma",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os turmas existentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os turmas existentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarTurmas = async (req, res) => {
        try {
            const { periodo, ano_lectivo, id_plano } = req.query;

            const response = await turmaServices.getTurmas(
                periodo,
                ano_lectivo,
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
            console.log(`\n\nErro ao listar turmas... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar turmas",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new turmaControllers();
