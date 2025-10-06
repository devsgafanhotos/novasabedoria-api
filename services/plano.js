const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA PLANO DO BANCO DE DADOS
const { plano: plano_model } = require("../config/database").conectModels();
class planoServices {
    /**
     * @param {Object} novo_plano - Objecto com os dados do novo plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo plano criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createPlano(novo_plano) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO PLANO ESTÁ DISPONÍVEL
             */
            const plano_encontrado = await plano_model.findOne({
                where: {
                    nome: novo_plano.nome,
                },
                row: true,
            });
            if (plano_encontrado) {
                return {
                    success: false,
                    message: "Nome do plano indisponível!",
                };
            }

            const plano_criado = await plano_model.create({
                nome: novo_plano.nome,
                tipo: novo_plano.tipo,
                descricao: novo_plano.descricao,
            });

            return {
                success: true,
                message: "Plano criado com sucesso!",
                data: plano_criado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar plano",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} plano - Objecto com os dados do novo plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o plano antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editPlano(plano) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO PLANO ESTÁ DISPONÍVEL
             */
            let plano_encontrado = await plano_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), plano.nome),
                        { [Op.not]: [where(col("id"), plano.id)] },
                    ],
                },
                row: true,
            });
            if (plano_encontrado) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome do plano indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO PLANO ENVIADO EXISTE
             */
            plano_encontrado = await plano_model.findOne({
                where: {
                    id: plano.id,
                },
                row: true,
            });
            if (!plano_encontrado) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            const planos_editados = await plano_model.update(
                {
                    nome: plano.nome,
                    tipo: plano.tipo,
                    descricao: plano.descricao,
                },
                { where: { id: plano.id } }
            );

            return {
                success: true,
                message: "Plano editado com sucesso!",
                data: plano_encontrado,
                meta: {
                    totalplanos_editados: planos_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar plano",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do Plano a ser deletado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o plano deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deletePlano(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO PLANO ENVIADO EXISTE
             */
            let plano_encontrado = await plano_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!plano_encontrado) {
                return {
                    success: false,
                    message: "ID do plano inexistente!",
                };
            }

            const planos_deletados = await plano_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Plano deletado com sucesso!",
                data: plano_encontrado,
                meta: {
                    total_planos_deletados: planos_deletados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar plano",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do Plano desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o plano desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getPlano(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO PLANO ENVIADO EXISTE
             */
            let plano_encontrado = await plano_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!plano_encontrado) {
                return {
                    success: false,
                    message: "ID do plano inexistente!",
                };
            }

            const plano_desejado = await plano_model.findOne({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Plano encontrado!",
                data: plano_desejado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar plano",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {string} [tipo_plano=""] - Adereço usado para filtrar a busca com base o tipo de plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o plano deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getPlanos(tipo_plano = "") {
        try {
            /**
             * @description BUSCAMOS DO BANCO TODOS OS PLANOS QUE TEM O TIPO PARECIDO COM O FILTRO ENVIADO
             */
            const planos = await plano_model.findAll({
                where: {
                    tipo: { [Op.like]: `%${tipo_plano}%` },
                },
                row: true,
            });

            return {
                success: true,
                message: "Lista de planos existentes.",
                data: planos,
                meta: {
                    total_planos_existente: planos.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar planos",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new planoServices();
