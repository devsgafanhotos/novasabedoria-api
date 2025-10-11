/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE funcoeS
 */
const { usuarioServices } = require("../services");

class funcaoControllers {
    /**
     * @description Insere um novo registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      errors: undefined
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyEmail(req, res) {
        try {
            const { email, entidade = "funcionario" } = req.body;

            const response = await usuarioServices.verifyUserEmail(email, {
                entidade: entidade,
            });

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    return res.status(500).json({
                        status: 500,
                        success: false,
                        message: "Erro interno ao verificar email",
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados}
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "Email inexistente!",
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(409).json({
                status: 409,
                success: false,
                message: "Email indisponível!",
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao verificar email... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao verificar email",
                errors: `${error}`,
            });
        }
    }

    /**
     * @description Insere um novo registro de funcao
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      errors: undefined
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyTelefone(req, res) {
        try {
            const { telefone, entidade = "funcionario" } = req.body;

            const response = await usuarioServices.verifyUserTelefone(telefone, {
                entidade: entidade,
            });

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    return res.status(500).json({
                        status: 500,
                        success: false,
                        message: "Erro interno ao verificar telefone",
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados}
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "Telefone inexistente!",
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(409).json({
                status: 409,
                success: false,
                message: "Telefone indisponível!",
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao verificar telefone... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao verificar telefone",
                errors: `${error}`,
            });
        }
    }
}

module.exports = new funcaoControllers();
