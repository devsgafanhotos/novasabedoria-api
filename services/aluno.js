const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA aluno DO BANCO DE DADOS
const { aluno: aluno_model } = require("../config/database").conectModels();

const usuarioServices = require("./usuario");

const { verifyFuncionarioID } = require("./funcionario");

class alunoServices {
    /**
     * @param {Object} novo_aluno - Objecto com os dados do novo aluno
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo aluno criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createAluno(novo_aluno) {
        try {
            let responseVerify = await usuarioServices.verifyUserEmail(
                novo_aluno.email,
                { entidade: "Aluno" }
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            responseVerify = await usuarioServices.verifyUserTelefone(
                novo_aluno.telefone,
                { entidade: "Aluno" }
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Telefone indisponível!",
                };
            }

            responseVerify = await this.verifyAlunoBi(novo_aluno.bi);
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Número do BI indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE O ID DO aluno QUE CADASTROU EXISTE
             */
            const response = await verifyFuncionarioID(
                novo_aluno.id_funcionario
            );
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcionário que cadastrou inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS O HASH DA SENHA A PARTRIR DO Nº DE TELEFONE
             */
            const senhaHash = await usuarioServices.createHash(
                novo_aluno.telefone
            );

            const aluno_criado = await aluno_model.create({
                nome: novo_aluno.nome,
                sobrenome: novo_aluno.sobrenome,
                data_nascimento: novo_aluno.data_nascimento,
                telefone: novo_aluno.telefone,
                email: novo_aluno.email,
                sexo: novo_aluno.sexo,
                bi: novo_aluno.bi,
                nome_pai: novo_aluno.nome_pai,
                nome_mae: novo_aluno.nome_mae,
                senha: senhaHash,
                id_funcionario: novo_aluno.id_funcionario,
            });

            return {
                success: true,
                message: "Aluno criado com sucesso!",
                data: aluno_criado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} data - Objecto com os dados do novo aluno
     * @param {Response} res - Objecto de resposta para podermos ingetar o cookie a partir daqui
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo aluno criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async loginAluno(data, res) {
        try {
            let responseEmail = await usuarioServices.verifyUserEmail(
                data.email,
                { entidade: "aluno" }
            );

            if (!responseEmail.success) {
                return {
                    success: false,
                    status: 404,
                    message: "Email inexistente!",
                };
            }
            /**
             * @description NESTE TRECHO VERIFICAMOS SE A SENHA FORNECIDA CORRESPONDE A SENHA DO FUNCIONÁRIO
             */
            const responseSenha = await usuarioServices.verifyHash(
                responseEmail.data.senha,
                data.senha
            );

            if (!responseSenha) {
                return {
                    success: false,
                    status: 401,
                    message: "Senha incorreta!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS OS TOKENS {ACCESS E REFRESH}
             */
            const payload = {
                id: responseEmail.data.id,
                nome: responseEmail.data.nome,
                sobrenome: responseEmail.data.sobrenome,
                telefone: responseEmail.data.telefone,
                email: responseEmail.data.email,
            };
            const ACCESS_TOKEN = await usuarioServices.createToken(
                payload,
                "ACCESS"
            );
            const REFRESH_TOKEN = await usuarioServices.createToken(
                payload,
                "REFRESH"
            );

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NUM COOKIE
             */
            const COOKIE_EXPIRATION = process.env.COOKIE_EXPIRATION;
            res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: COOKIE_EXPIRATION,
            });

            return {
                success: true,
                message: "Login feito com sucesso!",
                data: responseEmail.data,
                ACCESS_TOKEN: ACCESS_TOKEN,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} aluno - Objecto com os dados do novo aluno
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o aluno antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editAluno(aluno) {
        try {
            const responseId = await this.verifyAlunoID(aluno.id);
            if (!responseId.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do aluno inexistente!",
                };
            }

            let responseVerify = await usuarioServices.verifyUserEmail(
                aluno.email,
                { entidade: "aluno", id: aluno.id }
            );

            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            responseVerify = await usuarioServices.verifyUserTelefone(
                aluno.telefone,
                { entidade: "aluno", id: aluno.id }
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Telefone indisponível!",
                };
            }

            responseVerify = await this.verifyAlunoBi(aluno.bi, aluno.id);
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Número do BI indisponível!",
                };
            }

            const alunos_editados = await aluno_model.update(
                {
                    nome: aluno.nome,
                    sobrenome: aluno.sobrenome,
                    data_nascimento: aluno.data_nascimento,
                    telefone: aluno.telefone,
                    email: aluno.email,
                    sexo: aluno.sexo,
                    bi: aluno.bi,
                    nome_pai: aluno.nome_pai,
                    nome_mae: aluno.nome_mae,
                },
                { where: { id: aluno.id } }
            );

            return {
                success: true,
                message: "Aluno editado com sucesso!",
                data: responseId.data,
                meta: {
                    total_alunos_editados: alunos_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - Id do aluno que desejamos atualisar a senha
     * @param {String} senhaAntiga Senha antiga do funcionário
     * @param {String} senha Senha nova do funcionário
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o aluno antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editPassword(id, senhaAntiga, senha) {
        try {
            const responseId = await this.verifyAlunoID(id);
            if (!responseId.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do aluno inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE A SENHA ANTIGA FORNECIDA CORRESPONDE A SENHA DO FUNCIONÁRIO
             */

            const responseSenha = await usuarioServices.verifyHash(
                responseId.data.senha,
                senhaAntiga
            );

            if (!responseSenha) {
                return {
                    success: false,
                    status: 401,
                    message: "Senha incorreta!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS O HASH DA SENHA A PARTRIR DO Nº DE TELEFONE
             */
            const senhaHash = await usuarioServices.createHash(senha);

            const alunos_editados = await aluno_model.update(
                {
                    senha: senhaHash,
                },
                { where: { id: id } }
            );

            return {
                success: true,
                message: "Senha alterada com sucesso!",
                data: responseId.data,
                meta: {
                    total_alunos_editados: alunos_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao editar senha aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do aluno a ser deletado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o aluno deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteAluno(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID do aluno ENVIADO EXISTE
             */
            const responsealuno = await this.verifyAlunoID(id);
            if (!responsealuno.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do aluno inexistente!",
                };
            }

            const alunos_deletados = await aluno_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Aluno deletado com sucesso!",
                data: responsealuno.data,
                meta: {
                    total_alunos_deletados: alunos_deletados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do aluno desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o aluno desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getAluno(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO aluno ENVIADO EXISTE
             */
            let aluno_encontrado = await aluno_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!aluno_encontrado) {
                return {
                    success: false,
                    message: "ID do aluno inexistente!",
                };
            }

            return {
                success: true,
                message: "Aluno encontrado!",
                data: aluno_encontrado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar aluno",
                errors: `${error}`,
            };
        }
    }

    /**
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o aluno deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getAlunos() {
        try {
            /**
             * @description BUSCAMOS DO BANCO TODOS OS alunos
             */
            const alunos = await aluno_model.findAll({
                row: true,
            });

            return {
                success: true,
                message: "Lista de alunos existentes.",
                data: alunos,
                meta: {
                    total_alunos_existente: alunos.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar alunos",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyAlunoID(id) {
        /**
         * @description NESTE TRECHO VERIFICACAMOS SE O ID DO aluno ENVIADO EXISTE
         */

        const aluno_encontrado = await aluno_model.findOne({
            where: {
                id: id,
            },
            row: true,
        });
        if (!aluno_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: aluno_encontrado,
        };
    }

    /**
     * @param {String} bi
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se o ID já existe e false se ele não exite
     */
    async verifyAlunoBi(bi, id = null) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O bi DO aluno ESTÁ DISPONÍVEL
         */
        let aluno_encontrado = await aluno_model.findOne({
            where: {
                [Op.and]: [where(col("bi"), bi), idCondition],
            },
            row: true,
        });
        if (!aluno_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: aluno_encontrado,
        };
    }
}

module.exports = new alunoServices();
