/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE Disciplinas
 */
const { disciplinaServices } = require("../services");

class disciplinaControllers {
    /**
     * @description Insere um novo registro de disciplina
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo disciplina criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarDisciplina = async (req, res) => {
        try {
            const { body } = req;

            const response = await disciplinaServices.createDisciplina(body);

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
                `\n\nErro interno ao cadastrar disciplina... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar disciplina",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de disciplina
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o disciplina editado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarDisciplina = async (req, res) => {
        try {
            const { body } = req;

            const response = await disciplinaServices.editDisciplina(body);

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
            console.log(`\n\nErro interno ao editar disciplina... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar disciplina",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de disciplina
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o disciplina deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarDisciplina = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await disciplinaServices.deleteDisciplina(id);

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
                `\n\nErro interno ao deletar disciplina... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar disciplina",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de disciplina
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o disciplina desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilDisciplina = async (req, res) => {
        try {
            const { id = 0 } = req.query;

            const response = await disciplinaServices.getDisciplina(id);

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
            console.log(`\n\nErro interno ao buscar disciplina... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar disciplina",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os Disciplinas existentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os Disciplinas existentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarDisciplinas = async (req, res) => {
        try {
            const { id_plano } = req.query;

            const response = await disciplinaServices.getDisciplinas(id_plano);

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
            console.log(`\n\nErro ao listar Disciplinas... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar Disciplinas",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new disciplinaControllers();
