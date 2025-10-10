const { Op, where, col } = require("sequelize");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA disciplina DO BANCO DE DADOS
const { disciplina: disciplina_model } =
    require("../config/database").conectModels();

const { verifyPlanoID } = require("../services/plano");

class disciplinaServices {
    /**
     * @param {Object} nova_disciplina - Objecto com os dados do novo disciplina
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo disciplina criada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createDisciplina(nova_disciplina) {
        try {
            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO disciplina ESTÁ DISPONÍVEL
             */
            const disciplina_encontrada = await disciplina_model.findOne({
                where: {
                    nome: nova_disciplina.nome,
                },
                row: true,
            });
            if (disciplina_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da disciplina indisponível!",
                };
            }

            const response = await verifyPlanoID(nova_disciplina.id_plano);
            if (!response.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            const disciplina_criada = await disciplina_model.create({
                nome: nova_disciplina.nome,
                descricao: nova_disciplina.descricao,
                propina: nova_disciplina.propina,
                id_plano: nova_disciplina.id_plano,
            });

            return {
                success: true,
                message: "Disciplina criada com sucesso!",
                data: disciplina_criada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar disciplina",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} disciplina - Objecto com os dados do novo disciplina
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o disciplina antigo editada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async editDisciplina(disciplina) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DA disciplina ENVIADO EXISTE
             */
            const responseDisciplina = await this.verifyDisciplinaID(
                disciplina.id
            );
            if (!responseDisciplina.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID da disciplina inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO plano ENVIADO EXISTE
             */
            const responsePlano = await verifyPlanoID(disciplina.id_plano);
            if (!responsePlano.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID do plano inexistente!",
                };
            }

            /**
             * @description NESTE TRECHO VERIFICAMOS SE O NOME DO disciplina ESTÁ DISPONÍVEL
             */
            let disciplina_encontrada = await disciplina_model.findOne({
                where: {
                    [Op.and]: [
                        where(col("nome"), disciplina.nome),
                        { [Op.not]: [where(col("id"), disciplina.id)] },
                    ],
                },
                row: true,
            });
            if (disciplina_encontrada) {
                return {
                    success: false,
                    status: 409,
                    message: "Nome da disciplina indisponível!",
                };
            }

            const disciplinas_editadas = await disciplina_model.update(
                {
                    nome: disciplina.nome,
                    descricao: disciplina.descricao,
                    propina: disciplina.propina,
                    id_plano: disciplina.id_plano,
                },
                { where: { id: disciplina.id } }
            );

            return {
                success: true,
                message: "Disciplina editada com sucesso!",
                data: disciplina_encontrada,
                meta: {
                    total_disciplinas_editadas: disciplinas_editadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao cadastrar disciplina",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do disciplina a ser deletada
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o disciplina deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async deleteDisciplina(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DA disciplina ENVIADO EXISTE
             */
            const responseDisciplina = await this.verifyDisciplinaID(
                id
            );
            if (!responseDisciplina.success) {
                return {
                    success: false,
                    status: 404,
                    message: "ID da disciplina inexistente!",
                };
            }

            const disciplinas_deletadas = await disciplina_model.destroy({
                where: {
                    id: id,
                },
            });

            return {
                success: true,
                message: "Disciplina deletada com sucesso!",
                data: responseDisciplina.data,
                meta: {
                    total_disciplinas_deletadas: disciplinas_deletadas,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao deletar disciplina",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do disciplina desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o disciplina desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getDisciplina(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO disciplina ENVIADO EXISTE
             */
            let disciplina_encontrada = await disciplina_model.findOne({
                where: {
                    id: id,
                },
                row: true,
            });
            if (!disciplina_encontrada) {
                return {
                    success: false,
                    message: "ID da disciplina inexistente!",
                };
            }

            return {
                success: true,
                message: "Disciplina encontrada!",
                data: disciplina_encontrada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar disciplina",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id_plano
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: Array,
     *      errors: undefined
     * }} - Objecto contendo o disciplina deletada(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getDisciplinas(id_plano) {
        try {
            const conditionIdPlano = id_plano
                ? {
                      id_plano: id_plano,
                  }
                : null;

            /**
             * @description BUSCAMOS DO BANCO TODOS OS disciplinaS QUE TEM O TIPO PARECIDO COM O FILTRO ENVIADO
             */
            const disciplinas = await disciplina_model.findAll({
                where: conditionIdPlano,
                row: true,
            });

            return {
                success: true,
                message: "Lista de disciplinas existentes.",
                data: disciplinas,
                meta: {
                    total_disciplinas_existente: disciplinas.length,
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao listar disciplinas",
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
    async verifyDisciplinaID(id) {
        /**
         * @description NESTE TRECHO VERIFICACAMOS SE O ID DO disciplina ENVIADO EXISTE
         */

        const disciplina_encontrada = await disciplina_model.findOne({
            where: {
                id: id,
            },
            row: true,
        });
        if (!disciplina_encontrada) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: disciplina_encontrada,
        };
    }
}

module.exports = new disciplinaServices();
