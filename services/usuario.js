const argon2 = require("argon2");

class usuarioServices {
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
