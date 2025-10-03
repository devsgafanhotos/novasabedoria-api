const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA PLANO DO BANCO DE DADOS
const { plano: planoModel } = require("../config/database").conectModels();
class planoServices {
    /**
     * @param {Object} novoPlano - Objecto com os dados do novo plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo plano criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createPlano(novoPlano) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO PLANO ESTÁ DISPONÍVEL
             */
            const planoEncontrado = await planoModel.findOne({
                where: {
                    nome: novoPlano.nome,
                },
                row: true,
            });
            if (planoEncontrado) {
                return {
                    success: false,
                    message: "Nome do plano indisponível!",
                };
            }

            const planoCriado = await planoModel.create({
                nome: novoPlano.nome,
                tipo: novoPlano.tipo,
                descricao: novoPlano.descricao,
            });

            return {
                success: true,
                message: "Plano criado com sucesso!",
                data: planoCriado,
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
            let planoEncontrado = await planoModel.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), plano.nome),
                        { [Op.not]: [where(col("id"), plano.id)] },
                    ],
                },
                row: true,
            });
            if (planoEncontrado) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome do plano indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO PLANO ENVIADO EXISTE
             */
            planoEncontrado = await planoModel.findOne({
                where: {
                    id: plano.id,
                },
                row: true,
            });
            if (!planoEncontrado) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            const planosEditados = await planoModel.update(
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
                data: planoEncontrado,
                meta: {
                    totalPlanosEditados: planosEditados,
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
            let planoEncontrado = await planoModel.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!planoEncontrado) {
                return {
                    success: false,
                    message: "ID do plano inexistente!",
                };
            }

            const planosDeletados = await planoModel.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Plano deletado com sucesso!",
                data: planoEncontrado,
                meta: {
                    totalPlanosDeletados: planosDeletados,
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
            let planoEncontrado = await planoModel.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!planoEncontrado) {
                return {
                    success: false,
                    message: "ID do plano inexistente!",
                };
            }

            const planoDesejado = await planoModel.findOne({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Plano encontrado!",
                data: planoDesejado,
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
     * @param {string} [tipoPlano=""] - Adereço usado para filtrar a busca com base o tipo de plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o plano deletado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getPlanos(tipoPlano = "") {
        try {
            /**
             * @description BUSCAMOS DO BANCO TODOS OS PLANOS QUE TEM O TIPO PARECIDO COM O FILTRO ENVIADO
             */
            const planos = await planoModel.findAll({
                where: {
                    tipo: { [Op.like]: `%${tipoPlano}%` },
                },
                row: true,
            });

            return {
                success: true,
                message: "Lista de planos existentes.",
                data: planos,
                meta: {
                    totalPlanosExistente: planos.length,
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
