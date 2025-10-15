/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE receitas
 */
const { receitaServices } = require("../services");

class receitaControllers {
    /**
     * @description Insere um novo registro de receita
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo receita criada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarReceita = async (req, res) => {
        try {
            const { body } = req;

            const response = await receitaServices.createReceita(body);

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
            console.log(`\n\nErro interno ao cadastrar receita... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar receita",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de receita
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o receita editada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarReceita = async (req, res) => {
        try {
            const { body } = req;

            const response = await receitaServices.editReceita(body);

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
            console.log(`\n\nErro interno ao editar receita... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar receita",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de receita
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o receita deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarReceita = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await receitaServices.deleteReceita(id);

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
            console.log(`\n\nErro interno ao deletar receita... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar receita",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de receita
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o receita desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilReceita = async (req, res) => {
        try {
            const { id = 0 } = req.query;

            const response = await receitaServices.getReceita(id);

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
            console.log(`\n\nErro interno ao buscar receita... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar receita",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os receitas existentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os receitas existentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarReceitas = async (req, res) => {
        try {
            const { periodo, ano_lectivo, id_plano } = req.query;

            const response = await receitaServices.getReceitas(
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
            console.log(`\n\nErro ao listar receitas... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar receitas",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new receitaControllers();
