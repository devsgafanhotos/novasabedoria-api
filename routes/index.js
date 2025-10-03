/**
 * @description OBJECTO DE ROTEAMENTO
 */
const router = require("express").Router();


/**
 * @description INTEGRAÇÃO DA ROTA DE PLANOS AO ROTEADOR PRINCIPAL
 */
const planoRoutes = require("./plano");
router.use("/plano", planoRoutes);


module.exports = { router };
