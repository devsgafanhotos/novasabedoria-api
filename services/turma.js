const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA turma DO BANCO DE DADOS
const { turma: turma_model } = require("../config/database").conectModels();

const { verifyPlanoID } = require("../services/plano");

class turmaServices {
    /**
     * @param {Object} nova_turma - Objecto com os dados do novo turma
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo turma criada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createTurma(nova_turma) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME da turma ESTÁ DISPONÍVEL
             */
            const turma_encontrada = await turma_model.findOne({
                where: {
                    nome: nova_turma.nome,
                },
                row: true,
            });
            if (turma_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da turma indisponível!",
                };
            }

            const responsePlano = await verifyPlanoID(nova_turma.id_plano);
            if (!responsePlano.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            /**
             *@description NESTE TRECHO VERIFICAMOS SE JÁ EXISTE UMA SALA COM O MESMO NÚMERO
             */
            const responseNumeroSala = await turma_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("numero_sala"), nova_turma.numero_sala),
                        where(col("ano_lectivo"), nova_turma.ano_lectivo),
                    ],
                },
                row: true,
            });
            if (responseNumeroSala) {
                return {
                    success: false,
                    status: 409,
                    message: "Número da sala indisponível!",
                };
            }

            const turma_criada = await turma_model.create({
                nome: nova_turma.nome,
                numero_vagas: nova_turma.numero_vagas,
                numero_sala: nova_turma.numero_sala,
                periodo: nova_turma.periodo,
                ano_lectivo: nova_turma.ano_lectivo,
                id_plano: nova_turma.id_plano,
            });

            return {
                success: true,
                message: "Turma criada com sucesso!",
                data: turma_criada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar turma",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} turma - Objecto com os dados do novo turma
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o turma antigo editada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editTurma(turma) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME da turma ESTÁ DISPONÍVEL
             */
            let turma_encontrada = await turma_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), turma.nome),
                        { [Op.not]: [where(col("id"), turma.id)] },
                    ],
                },
                row: true,
            });
            if (turma_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da turma indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DA turma ENVIADO EXISTE
             */
            turma_encontrada = await turma_model.findOne({
                where: {
                    id: turma.id,
                },
                row: true,
            });
            if (!turma_encontrada) {
                return {
                    success: false,
                    status: 404,
                    message: "ID da turma inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO plano ENVIADO EXISTE
             */
            const response = await verifyPlanoID(turma.id_plano);
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            /**
             *@description NESTE TRECHO VERIFICAMOS SE JÁ EXISTE UMA SALA COM O MESMO NÚMERO
             */
            const responseNumeroSala = await turma_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("numero_sala"), turma.numero_sala),
                        where(col("ano_lectivo"), turma.ano_lectivo),
                        { [Op.not]: [where(col("id"), turma.id)] },
                    ],
                },
                row: true,
            });
            if (responseNumeroSala) {
                return {
                    success: false,
                    status: 409,
                    message: "Número da sala indisponível!",
                };
            }

            const turmas_editadas = await turma_model.update(
                {
                    nome: turma.nome,
                    numero_vagas: turma.numero_vagas,
                    numero_sala: turma.numero_sala,
                    periodo: turma.periodo,
                    ano_lectivo: turma.ano_lectivo,
                    id_plano: turma.id_plano,
                },
                { where: { id: turma.id } }
            );

            return {
                success: true,
                message: "Turma editada com sucesso!",
                data: turma_encontrada,
                meta: {
                    total_turmas_editadas: turmas_editadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar turma",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID da turma a ser deletada
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o turma deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteTurma(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID da turma ENVIADO EXISTE
             */
            let turma_encontrada = await turma_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!turma_encontrada) {
                return {
                    success: false,
                    message: "ID da turma inexistente!",
                };
            }

            const turmas_editadas = await turma_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Turma deletada com sucesso!",
                data: turma_encontrada,
                meta: {
                    total_turmas_editadas: turmas_editadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar turma",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID da turma desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o turma desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getTurma(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID da turma ENVIADO EXISTE
             */
            let turma_encontrada = await turma_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!turma_encontrada) {
                return {
                    success: false,
                    message: "ID da turma inexistente!",
                };
            }

            return {
                success: true,
                message: "Turma encontrada!",
                data: turma_encontrada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar turma",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {string} periodo Atributo que permite filtrar as turmas por período
     * @param {number} [ano_lectivo=new Date().getFullYear()] - Atributo que permite filtrar as turmas por ano
     * @param {Number} id_plano - Atributo que permite filtrar as turmas por plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o turma deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getTurmas(
        periodo = "",
        ano_lectivo = new Date().getFullYear(),
        id_plano
    ) {
        try {
            const conditionIdPlano = id_plano
                ? where(col("id_plano"), id_plano)
                : null;
            /**
             * @description BUSCAMOS DO BANCO TODAS AS turmas com base os filtros enviados
             */
            const turmas = await turma_model.findAll({
                where: {
                    [Op.and]: [
                        where(col("periodo"), { [Op.like]: [`%${periodo}%`] }),
                        where(col("ano_lectivo"), { [Op.like]: [`%${ano_lectivo}%`] }),
                        conditionIdPlano,
                    ],
                },
                row: true,
            });

            return {
                success: true,
                message: "Lista de turmas existentes.",
                data: turmas,
                meta: {
                    total_turmas_existente: turmas.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar turmas",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new turmaServices();
