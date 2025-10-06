const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA funcao DO BANCO DE DADOS
const { funcao: funcao_model } = require("../config/database").conectModels();

const { verifyDepartamentoID } = require("../services/departamento");

class funcaoServices {
    /**
     * @param {Object} nova_funcao - Objecto com os dados do novo funcao
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo funcao criada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createFuncao(nova_funcao) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO funcao ESTÁ DISPONÍVEL
             */
            const funcao_encontrada = await funcao_model.findOne({
                where: {
                    nome: nova_funcao.nome,
                },
                row: true,
            });
            if (funcao_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da funcao indisponível!",
                };
            }

            const response = await verifyDepartamentoID(
                nova_funcao.id_departamento
            );
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do departamento inexistente!",
                };
            }

            const funcao_criada = await funcao_model.create({
                nome: nova_funcao.nome,
                descricao: nova_funcao.descricao,
                id_departamento: nova_funcao.id_departamento,
            });

            return {
                success: true,
                message: "Funcao criada com sucesso!",
                data: funcao_criada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar funcao",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} funcao - Objecto com os dados do novo funcao
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcao antigo editado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editFuncao(funcao) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO funcao ESTÁ DISPONÍVEL
             */
            let funcao_encontrada = await funcao_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), funcao.nome),
                        { [Op.not]: [where(col("id"), funcao.id)] },
                    ],
                },
                row: true,
            });

            if (funcao_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome do funcao indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DA funcao ENVIADO EXISTE
             */
            funcao_encontrada = await funcao_model.findOne({
                where: {
                    id: funcao.id,
                },
                row: true,
            });
            if (!funcao_encontrada) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcao inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO departamento ENVIADO EXISTE
             */
            const response = await verifyDepartamentoID(funcao.id_departamento);
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do departamento inexistente!",
                };
            }

            const funcaos_editados = await funcao_model.update(
                {
                    nome: funcao.nome,
                    descricao: funcao.descricao,
                    id_departamento: funcao.id_departamento,
                },
                { where: { id: funcao.id } }
            );

            return {
                success: true,
                message: "Funcao editado com sucesso!",
                data: funcao_encontrada,
                meta: {
                    total_funcaos_editados: funcaos_editados,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar funcao",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do funcao a ser deletada
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcao deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteFuncao(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO funcao ENVIADO EXISTE
             */
            let funcao_encontrada = await funcao_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!funcao_encontrada) {
                return {
                    success: false,
                    message: "ID do funcao inexistente!",
                };
            }

            const funcaos_deletadas = await funcao_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Funcao deletada com sucesso!",
                data: funcao_encontrada,
                meta: {
                    total_funcaos_deletadas: funcaos_deletadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar funcao",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do funcao desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o funcao desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getFuncao(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO funcao ENVIADO EXISTE
             */
            let funcao_encontrada = await funcao_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!funcao_encontrada) {
                return {
                    success: false,
                    message: "ID da funcao inexistente!",
                };
            }

            const funcao_desejado = await funcao_model.findOne({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Funcao encontrada!",
                data: funcao_desejado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar funcao",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id_departamento
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o funcao deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getFuncoes(id_departamento) {
        try {            
            const conditionIdDepartamento = id_departamento ? {
                    id_departamento: id_departamento,
            } : null;

            /**
             * @description BUSCAMOS DO BANCO TODOS OS funcaoS QUE TEM O TIPO PARECIDO COM O FILTRO ENVIADO
             */
            const funcaos = await funcao_model.findAll({
                where: conditionIdDepartamento,
                row: true,
            });

            return {
                success: true,
                message: "Lista de funcaos existentes.",
                data: funcaos,
                meta: {
                    total_funcaos_existente: funcaos.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar funcaos",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new funcaoServices();
