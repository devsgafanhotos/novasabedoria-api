const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA departamento DO BANCO DE DADOS
const { departamento: departamento_model } =
    require("../config/database").conectModels();
    
class departamentoServices {
    /**
     * @param {Object} novo_departamento - Objecto com os dados do novo departamento
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo departamento criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createDepartamento(novo_departamento) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO departamento ESTÁ DISPONÍVEL
             */
            const departamento_encontrado = await departamento_model.findOne({
                where: {
                    nome: novo_departamento.nome,
                },
                row: true,
            });
            if (departamento_encontrado) {
                return {
                    success: false,
                    message: "Nome do departamento indisponível!",
                };
            }

            const departamento_criado = await departamento_model.create({
                nome: novo_departamento.nome,
                descricao: novo_departamento.descricao,
            });

            return {
                success: true,
                message: "Departamento criado com sucesso!",
                data: departamento_criado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar departamento",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} departamento - Objecto com os dados do novo departamento
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o departamento antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editDepartamento(departamento) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO departamento ENVIADO EXISTE
             */
            const response = await this.verifyDepartamentoID(departamento.id);
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do departamento inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO departamento ESTÁ DISPONÍVEL
             */
            let departamento_encontrado = await departamento_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), departamento.nome),
                        { [Op.not]: [where(col("id"), departamento.id)] },
                    ],
                },
                row: true,
            });
            if (departamento_encontrado) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome do departamento indisponível!",
                };
            }

            const departamentos_editados = await departamento_model.update(
                {
                    nome: departamento.nome,
                    descricao: departamento.descricao,
                },
                { where: { id: departamento.id } }
            );

            return {
                success: true,
                message: "Departamento editado com sucesso!",
                data: response.data,
                meta: {
                    total_departamentos_editados: departamentos_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar departamento",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do departamento a ser deletado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o departamento deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteDepartamento(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO departamento ENVIADO EXISTE
             */
            let departamento_encontrado = await departamento_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!departamento_encontrado) {
                return {
                    success: false,
                    message: "ID do departamento inexistente!",
                };
            }

            const departamentos_deletados = await departamento_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Departamento deletado com sucesso!",
                data: departamento_encontrado,
                meta: {
                    total_departamentos_deletados: departamentos_deletados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar departamento",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do departamento desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o departamento desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getDepartamento(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO departamento ENVIADO EXISTE
             */
            let departamento_encontrado = await departamento_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!departamento_encontrado) {
                return {
                    success: false,
                    message: "ID do departamento inexistente!",
                };
            }

            return {
                success: true,
                message: "Departamento encontrado!",
                data: departamento_encontrado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar departamento",
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
     * }} - Objecto contendo o departamento deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getDepartamentos() {
        try {
            /**
             * @description BUSCAMOS DO BANCO TODOS OS departamentoS QUE TEM O TIPO PARECIDO COM O FILTRO ENVIADO
             */
            const departamentos = await departamento_model.findAll({
                row: true,
            });

            return {
                success: true,
                message: "Lista de departamentos existentes.",
                data: departamentos,
                meta: {
                    total_departamentos_existente: departamentos.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar departamentos",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se o ID já existe e false se ele não exite
     */
    async verifyDepartamentoID(id) {
        /**
         * @description NESTE TRECHO VERIFICACAMOS SE O ID DO departamento ENVIADO EXISTE
         */
        const departamento_encontrado = await departamento_model.findOne({
            where: {
                id: id,
            },
            row: true,
        });
        if (!departamento_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: departamento_encontrado,
        };
    }
}

module.exports = new departamentoServices();
