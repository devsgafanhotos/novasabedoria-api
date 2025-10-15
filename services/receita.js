const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA receita DO BANCO DE DADOS
const { receita: receita_model } = require("../config/database").conectModels();

const { verifyFuncionarioID } = require("../services/funcionario");
const { verifyAlunoID } = require("../services/aluno");

class receitaServices {
    /**
     * @param {Object} nova_receita - Objecto com os dados do novo receita
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo receita criada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createReceita(nova_receita) {
        try {
            const responseAlunoID = await verifyAlunoID(nova_receita.id_aluno);
            if (!responseAlunoID.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do aluno inexistente!",
                };
            }

            const responseFuncionarioID = await verifyFuncionarioID(
                nova_receita.id_funcionario
            );
            if (!responseFuncionarioID.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do funcionario inexistente!",
                };
            }

            const data_ultima_propina = await receita_model.max(
                "data_correspondente",
                {
                    where: {
                        [Op.and]: [
                            where(col("id_aluno"), nova_receita.id_aluno),
                            where(col("tipo_receita"), "Propina"),
                        ],
                    },
                    raw: true,
                }
            );

            if (
                data_ultima_propina.getFullYear() ===
                new Date(nova_receita.data_correspondente).getFullYear()
            ) {
                const diferenca_de_meses =
                    new Date(nova_receita.data_correspondente).getMonth() -
                    data_ultima_propina.getMonth();

                if (diferenca_de_meses !== 1) {
                    return {
                        success: false,
                        status: 400,
                        message:
                            `Garanta que os meses: de ${data_ultima_propina.getMonth()+2} à ${new Date(nova_receita.data_correspondente).getMonth()} foram pagos!`,
                    };
                }
            }

            const propina_encontrada = await receita_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("id_aluno"), nova_receita.id_aluno),
                        where(col("tipo_receita"), "Propina"),
                        where(col("data_correspondente"), {
                            [Op.like]: [
                                `%${nova_receita.data_correspondente}%`,
                            ],
                        }),
                    ],
                },
                raw: true,
            });
            if (propina_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message:
                        "A propina deste período para este aluno já foi paga!",
                };
            }

            const receita_criada = [] /*await receita_model.create({
                tipo_receita: nova_receita.tipo_receita,
                data_correspondente: nova_receita.data_correspondente,
                descricao: nova_receita.descricao,
                id_funcionario: nova_receita.id_funcionario,
                id_aluno: nova_receita.id_aluno,
            });*/

            return {
                success: true,
                message: "Receita criada com sucesso!",
                data: receita_criada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar receita",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} receita - Objecto com os dados do novo receita
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o receita antigo editada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editReceita(receita) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME da receita ESTÁ DISPONÍVEL
             */
            let receita_encontrada = await receita_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), receita.nome),
                        { [Op.not]: [where(col("id"), receita.id)] },
                    ],
                },
                raw: true,
            });
            if (receita_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da receita indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DA receita ENVIADO EXISTE
             */
            receita_encontrada = await receita_model.findOne({
                where: {
                    id: receita.id,
                },
                raw: true,
            });
            if (!receita_encontrada) {
                return {
                    success: false,
                    status: 404,
                    message: "ID da receita inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO plano ENVIADO EXISTE
             */
            const response = await verifyPlanoID(receita.id_plano);
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
            const responseNumeroSala = await receita_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("numero_sala"), receita.numero_sala),
                        where(col("ano_lectivo"), receita.ano_lectivo),
                        { [Op.not]: [where(col("id"), receita.id)] },
                    ],
                },
                raw: true,
            });
            if (responseNumeroSala) {
                return {
                    success: false,
                    status: 409,
                    message: "Número da sala indisponível!",
                };
            }

            const receitas_editadas = await receita_model.update(
                {
                    nome: receita.nome,
                    numero_vagas: receita.numero_vagas,
                    numero_sala: receita.numero_sala,
                    periodo: receita.periodo,
                    ano_lectivo: receita.ano_lectivo,
                    id_plano: receita.id_plano,
                },
                { where: { id: receita.id } }
            );

            return {
                success: true,
                message: "Receita editada com sucesso!",
                data: receita_encontrada,
                meta: {
                    total_receitas_editadas: receitas_editadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar receita",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID da receita a ser deletada
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o receita deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteReceita(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID da receita ENVIADO EXISTE
             */
            let receita_encontrada = await receita_model.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (!receita_encontrada) {
                return {
                    success: false,
                    message: "ID da receita inexistente!",
                };
            }

            const receitas_editadas = await receita_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Receita deletada com sucesso!",
                data: receita_encontrada,
                meta: {
                    total_receitas_editadas: receitas_editadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar receita",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID da receita desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o receita desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getReceita(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID da receita ENVIADO EXISTE
             */
            let receita_encontrada = await receita_model.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (!receita_encontrada) {
                return {
                    success: false,
                    message: "ID da receita inexistente!",
                };
            }

            return {
                success: true,
                message: "Receita encontrada!",
                data: receita_encontrada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar receita",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {string} periodo Atributo que permite filtrar as receitas por período
     * @param {number} [ano_lectivo=new Date().getFullYear()] - Atributo que permite filtrar as receitas por ano
     * @param {Number} id_plano - Atributo que permite filtrar as receitas por plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o receita deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getReceitas(
        periodo = "",
        ano_lectivo = new Date().getFullYear(),
        id_plano
    ) {
        try {
            const conditionIdPlano = id_plano
                ? where(col("id_plano"), id_plano)
                : null;
            /**
             * @description BUSCAMOS DO BANCO TODAS AS receitas com base os filtros enviados
             */
            const receitas = await receita_model.findAll({
                /*where: {
                    [Op.and]: [
                        where(col("periodo"), { [Op.like]: [`%${periodo}%`] }),
                        where(col("ano_lectivo"), {
                            [Op.like]: [`%${ano_lectivo}%`],
                        }),
                        conditionIdPlano,
                    ],
                },*/
                raw: true,
            });

            return {
                success: true,
                message: "Lista de receitas existentes.",
                data: receitas,
                meta: {
                    total_receitas_existente: receitas.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar receitas",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new receitaServices();
