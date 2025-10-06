/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE DEPARTAMENTOS
 */
const { departamentoServices } = require("../services");

class departamentoControllers {
    /**
     * @description Insere um novo registro de departamento
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo departamento criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarDepartamento = async (req, res) => {
        try {
            const { body } = req;

            const response = await departamentoServices.createDepartamento(body);

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
                return res.status(409).json({
                    status: 409,
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
            console.log(`\n\nErro interno ao cadastrar departamento... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar departamento",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Edita um registro de departamento
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o departamento editado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    editarDepartamento = async (req, res) => {
        try {
            const { body } = req;

            const response = await departamentoServices.editDepartamento(body);

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
            console.log(`\n\nErro interno ao editar departamento... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao editar departamento",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de departamento
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o departamento deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    deletarDepartamento = async (req, res) => {
        try {
            const { id } = req.body;

            const response = await departamentoServices.deleteDepartamento(id);

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
            console.log(`\n\nErro interno ao deletar departamento... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao deletar departamento",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Deletar um registro de departamento
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o departamento desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    perfilDepartamento = async (req, res) => {
        try {
            const { id=0 } = req.query;

            const response = await departamentoServices.getDepartamento(id);

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
            console.log(`\n\nErro interno ao buscar departamento... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar departamento",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Retorna todos os departamentos existentes
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo os departamentos existentes(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    listarDepartamentos = async (req, res) => {
        try {
            const { } = req.query;

            const response = await departamentoServices.getDepartamentos();

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
            console.log(`\n\nErro ao listar departamentos... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao listar departamentos",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new departamentoControllers();
