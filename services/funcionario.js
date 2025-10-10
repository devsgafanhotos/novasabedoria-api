const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA funcionario DO BANCO DE DADOS
const { funcionario: funcionario_model } =
    require("../config/database").conectModels();

const usuarioServices = require("./usuario");

class funcionarioServices {
    /**
     * @param {Object} novo_funcionario - Objecto com os dados do novo funcionario
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo funcionario criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createFuncionario(novo_funcionario) {
        try {
            let responseVerify = await this.verifyFuncionarioEmail(
                novo_funcionario.email
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            responseVerify = await this.verifyFuncionarioTelefone(
                novo_funcionario.telefone
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Telefone indisponível!",
                };
            }

            responseVerify = await this.verifyFuncionarioBi(
                novo_funcionario.bi
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Número do BI indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE O ID DO funcionario QUE CADASTROU EXISTE
             */
            const funcionariosExistentes = await this.getFuncionarios();
            if (funcionariosExistentes.meta.total_funcionarios_existente) {
                const response = await this.verifyFuncionarioID(
                    novo_funcionario.id_funcionario
                );
                if (!response.success) {
                    return {
                        success: false,
                        status: 404,
                        message: "ID do funcionário que cadastrou inexistente!",
                    };
                }
            }

            /**
             * @description NESTE TRECHO GERAMOS O HASH DA SENHA A PARTRIR DO Nº DE TELEFONE
             */
            const senhaHash = await usuarioServices.createHash(
                novo_funcionario.telefone
            );

            const funcionario_criado = await funcionario_model.create({
                nome: novo_funcionario.nome,
                sobrenome: novo_funcionario.sobrenome,
                data_nascimento: novo_funcionario.data_nascimento,
                telefone: novo_funcionario.telefone,
                email: novo_funcionario.email,
                sexo: novo_funcionario.sexo,
                bi: novo_funcionario.bi,
                nome_pai: novo_funcionario.nome_pai,
                nome_mae: novo_funcionario.nome_mae,
                senha: senhaHash,
                id_funcionario: novo_funcionario.id_funcionario,
            });

            return {
                success: true,
                message: "Funcionario criado com sucesso!",
                data: funcionario_criado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar funcionario",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} funcionario - Objecto com os dados do novo funcionario
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcionario antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editFuncionario(funcionario) {
        try {
            const responseId = await this.verifyFuncionarioID(funcionario.id);
            if (!responseId.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcionario inexistente!",
                };
            }

            let responseVerify = await this.verifyFuncionarioEmail(
                funcionario.email,
                funcionario.id
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            responseVerify = await this.verifyFuncionarioTelefone(
                funcionario.telefone,
                funcionario.id
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Telefone indisponível!",
                };
            }

            responseVerify = await this.verifyFuncionarioBi(
                funcionario.bi,
                funcionario.id
            );
            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Número do BI indisponível!",
                };
            }

            const funcionarios_editados = await funcionario_model.update(
                {
                    nome: funcionario.nome,
                    sobrenome: funcionario.sobrenome,
                    data_nascimento: funcionario.data_nascimento,
                    telefone: funcionario.telefone,
                    email: funcionario.email,
                    sexo: funcionario.sexo,
                    bi: funcionario.bi,
                    nome_pai: funcionario.nome_pai,
                    nome_mae: funcionario.nome_mae,
                },
                { where: { id: funcionario.id } }
            );

            return {
                success: true,
                message: "Funcionario editado com sucesso!",
                data: responseId.data,
                meta: {
                    total_funcionarios_editados: funcionarios_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar funcionario",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - Id do funcionario que desejamos atualisar a senha
     * @param {String} senhaAntiga Senha antiga do funcionário
     * @param {String} senha Senha nova do funcionário
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcionario antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editPassword(id, senhaAntiga, senha) {
        try {
            const responseId = await this.verifyFuncionarioID(id);
            if (!responseId.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcionario inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE A SENHA ANTIGA FORNECIDA CORRESPONDE A SENHA DO FUNCIONÁRIO
             */
            
            const responseSenha = await usuarioServices.verifyHash(responseId.data.senha, senhaAntiga)
            
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
            const senhaHash = await usuarioServices.createHash(
                senha
            );

            const funcionarios_editados = await funcionario_model.update(
                {
                    senha: senhaHash
                },
                { where: { id: id } }
            );

            return {
                success: true,
                message: "Senha alterada com sucesso!",
                data: responseId.data,
                meta: {
                    total_funcionarios_editados: funcionarios_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao editar senha funcionario",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do funcionario a ser deletada
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcionario deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteFuncionario(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID do funcionario ENVIADO EXISTE
             */
            const responseFuncionario = await this.verifyFuncionarioID(id);
            if (!responseFuncionario.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcionario inexistente!",
                };
            }

            const funcionarios_deletadas = await funcionario_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Funcionario deletada com sucesso!",
                data: responseFuncionario.data,
                meta: {
                    total_funcionarios_deletadas: funcionarios_deletadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar funcionario",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do funcionario desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcionario desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getFuncionario(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO funcionario ENVIADO EXISTE
             */
            let funcionario_encontrado = await funcionario_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!funcionario_encontrado) {
                return {
                    success: false,
                    message: "ID do funcionario inexistente!",
                };
            }

            return {
                success: true,
                message: "Funcionario encontrada!",
                data: funcionario_encontrado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar funcionario",
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
     * }} - Objecto contendo o funcionario deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getFuncionarios() {
        try {
            /**
             * @description BUSCAMOS DO BANCO TODOS OS funcionarios
             */
            const funcionarios = await funcionario_model.findAll({
                row: true,
            });

            return {
                success: true,
                message: "Lista de funcionarios existentes.",
                data: funcionarios,
                meta: {
                    total_funcionarios_existente: funcionarios.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar funcionarios",
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
    async verifyFuncionarioID(id) {
        /**
         * @description NESTE TRECHO VERIFICACAMOS SE O ID DO funcionario ENVIADO EXISTE
         */

        const funcionario_encontrado = await funcionario_model.findOne({
            where: {
                id: id,
            },
            row: true,
        });
        if (!funcionario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: funcionario_encontrado,
        };
    }

    /**
     * @param {String} email
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyFuncionarioEmail(email, id = null) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O EMAIL DO funcionario ESTÁ DISPONÍVEL
         */
        let funcionario_encontrado = await funcionario_model.findOne({
            where: {
                [Op.and]: [where(col("email"), email), idCondition],
            },
            row: true,
        });
        if (!funcionario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: funcionario_encontrado,
        };
    }

    /**
     * @param {String} telefone
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyFuncionarioTelefone(telefone, id = null) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O telefone DO funcionario ESTÁ DISPONÍVEL
         */
        let funcionario_encontrado = await funcionario_model.findOne({
            where: {
                [Op.and]: [where(col("telefone"), telefone), idCondition],
            },
            row: true,
        });
        if (!funcionario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: funcionario_encontrado,
        };
    }

    /**
     * @param {String} bi
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se o ID já existe e false se ele não exite
     */
    async verifyFuncionarioBi(bi, id = null) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O bi DO funcionario ESTÁ DISPONÍVEL
         */
        let funcionario_encontrado = await funcionario_model.findOne({
            where: {
                [Op.and]: [where(col("bi"), bi), idCondition],
            },
            row: true,
        });
        if (!funcionario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: funcionario_encontrado,
        };
    }
}

module.exports = new funcionarioServices();
