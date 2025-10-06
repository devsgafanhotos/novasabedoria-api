/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE funcoeS
 */
const { funcaoServices } = require("../services");

class funcaoControllers {
    /**
     * @description Insere um novo registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo funcao criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarFuncao = async (req, res) => {
        try {
            const { body } = req;

            const response = await funcaoServices.createFuncao(body);

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
            console.log(`\n\nErro interno ao cadastrar funcao... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar funcao",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o funcao editado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarFuncao = async (req, res) => {
        try {
            const { body } = req;

            const response = await funcaoServices.editFuncao(body);

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
            console.log(`\n\nErro interno ao editar funcao... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar funcao",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o funcao deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarFuncao = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await funcaoServices.deleteFuncao(id);

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
            console.log(`\n\nErro interno ao deletar funcao... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar funcao",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o funcao desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilFuncao = async (req, res) => {
        try {
            const { id=0 } = req.query;

            const response = await funcaoServices.getFuncao(id);

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
            console.log(`\n\nErro interno ao buscar funcao... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar funcao",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os funcoes existentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os funcoes existentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarFuncoes = async (req, res) => {
        try {
            const { id_departamento } = req.query;

            const response = await funcaoServices.getFuncoes(id_departamento);

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
            console.log(`\n\nErro ao listar funcoes... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar funcoes",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new funcaoControllers();