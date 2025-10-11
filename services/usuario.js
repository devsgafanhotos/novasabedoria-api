const { Op, col, where } = require("sequelize");
const argon2 = require("argon2");

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA funcionario DO BANCO DE DADOS
const { funcionario: funcionario_model } =
    require("../config/database").conectModels();

const { aluno: aluno_model } = require("../config/database").conectModels();
class usuarioServices {
    /**
     * @param {String} email - Email a verificar se já existe
     * @param {Object} Options
     * @param {String} [Options.entidade="funcionario"] - Entidade onde desejamos verificar (funcionario ou aluno)
     * @param {Number} [Options.id=null]
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyUserEmail(email, { entidade = "funcionario", id = null }) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        const model = entidade == "funcionario"
            ? funcionario_model
            : aluno_model;

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O EMAIL DO usuario ESTÁ DISPONÍVEL
         */
        let usuario_encontrado = await model.findOne({
            where: {
                [Op.and]: [where(col("email"), email), idCondition],
            },
            row: true,
        });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    /**
     * @param {String} telefone - Telefone a verificar se já existe
     * @param {Object} Options
     * @param {String} [Options.entidade="funcionario"] - Entidade onde desejamos verificar (funcionario ou aluno)
     * @param {Number} [Options.id=null]
     * @returns {{
     *      success: Boolean,
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyUserTelefone(telefone, { entidade = "funcionario", id = null }) {
        const idCondition = id && {
            [Op.not]: [where(col("id"), id)],
        };

        const model = entidade == "funcionario"
            ? funcionario_model
            : aluno_model;

        /**
         * @description NESTE TRECHO VERIFICAMOS SE O telefone DO usuario ESTÁ DISPONÍVEL
         */
        let usuario_encontrado = await model.findOne({
            where: {
                [Op.and]: [where(col("telefone"), telefone), idCondition],
            },
            row: true,
        });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    /**
     *
     * @param {String} string - String que desejamos gerar o hash
     * @returns {String} - Palavra hashada
     */
    async createHash(string) {
        return await argon2.hash(string, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3, // nº de iterações
            parallelism: 1, // threads
        });
    }

    /**
     * @param {hash} hash - Hash com o qual vmos comparar a string
     * @param {String} string - String que desejamos comparar
     * @returns {Boolean} - true se a String Corresponde ao hash e false caso não correspondam
     */
    async verifyHash(hash, string) {
        const valid = await argon2.verify(hash, string);

        return valid;
    }
}
module.exports = new usuarioServices();
