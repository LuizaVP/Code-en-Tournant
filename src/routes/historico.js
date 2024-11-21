var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.post("/finalizarQuiz/:idQuiz/:idUsuario", function (req, res) {
    historicoController.finalizarQuiz(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    historicoController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;