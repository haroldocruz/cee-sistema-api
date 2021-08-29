var express = require('express');
var router = express.Router();
var path = require('path');



/* GET home page. */
router.get('/', function(req, res, next) {

  const routes = [
    {
      "description": "Rota inicial: mostra todos os endpoints disponíveis na API",
      "method": "GET",
      "path": `http://${req.hostname}/`
    },
    {
      "description": "Busca todos os instrumentos; não há filtros neste endpoint",
      "method": "GET",
      "path": `http://${req.hostname}/instrument`
    },
    {
      "description": "Salva um instrumento de cada vez",
      "method": "POST",
      "path": `http://${req.hostname}/instrument`
    },
    {
      "description": "Busca todos os usuários",
      "method": "GET",
      "path": `http://${req.hostname}/user`
    },
    {
      "description": "Busca um usuário",
      "method": "GET",
      "path": `http://${req.hostname}/user/:id`
    },
    {
      "description": "Atualiza um usuário",
      "method": "PUT",
      "path": `http://${req.hostname}/user/:id`
    },
    {
      "description": "Remove um usuário",
      "method": "DELETE",
      "path": `http://${req.hostname}/user/:id`
    },
  ]

  res.render('index', { title: 'Servidor Rodando!', routes });
});

module.exports = router;
