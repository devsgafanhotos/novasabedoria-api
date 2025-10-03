const Sequelize = require("sequelize");

/**
 * @description LÓGICA PARA CONECTARMO-NOS AO BANCO DE DADOS E VERIFICARMOS O STATUS DA CONEXÃO
 */
const sequelize = new Sequelize(process.env.DATABASE_URL);
function conectDB() {
    return sequelize
        .authenticate()
        .then(() => {
            console.log(`CONECTADO AO BANCO...`);
            return true;
        })
        .catch((error) => {
            console.log(`ERRO DE CONEXÃO AO BANCO... ${error}`);
            return false;
        });
}

/**
 * @description CONECTAMOS O OBJECTO DE CONEXÃO AO BANCO DE DADOS COM OS MODELS DE ITERAÇÃO COM O BANCO
 */
const { initModels } = require("../models/init-models");
function conectModels() {
    return initModels(sequelize);
}

module.exports = { conectDB, conectModels };

//npx sequelize-auto -o mysql ./models -d novaSabedoria -h localhost -u root -p 3306 -x senha -e mysql