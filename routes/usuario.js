const usuarioRouter = require("express").Router();
const { usuarioControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE UM EMAIL E VERIFICA SE ELE JÁ EXISTE
 * @route /usuario/verifyEmail
 */
usuarioRouter.post("/verifyEmail", usuarioControllers.verifyEmail);

/**
 * @description ROTA QUE RECEBE UM EMAIL E VERIFICA SE ELE JÁ EXISTE
 * @route /usuario/verifyEmail
 */
usuarioRouter.post("/verifyTelefone", usuarioControllers.verifyTelefone);

module.exports = usuarioRouter;
