var express = require('express');
var router = express.Router();
const mail = require('../utils/Email');

/* GET home page. */
router.get('/email', function(req, res, next) {
    res.render('home');
});

router.post('/email',function(req,res,next){
    const dados = req.body;

    req.assert("nome", "O nome é obrigatório").notEmpty();
    req.assert("email", "O email é obrigatório").notEmpty();
    req.assert("codigo", "O código é obrigatório").notEmpty();

    const erros = req.validationErrors();

    if(erros){
        next(erros);
    }else{
        mail.enviarEmail(dados.email, dados.nome, dados.codigo);
        res.redirect('/email');
    }
});

module.exports = router;
