const mail = require('nodemailer');
const hbsPlugin = require('nodemailer-express-handlebars');

const transporter = mail.createTransport({
    host: '',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});

var options = {
    viewEngine: 'handlebars',
    viewPath:'./views'
}

transporter.use('compile', hbsPlugin(options));

function enviarEmail(dest, nome_dest, codigo_ar){
    var mail  = {
        from : '"',
        to: '',
        subject: 'Comunicado',
        template: 'comunicado',
        context: {
            nome: nome_dest,
            codigo: codigo_ar
        }
    };
    return transporter.sendMail(mail,function(error, info){
        if (error) {
            console.log(error);
        }else {
            console.log('Email enviado: ' + info.response);
        }
    });
};

function reportarErro(){
    var mailOptions  = {
        from : '',
        to: '',
        subject: 'Erro no sistema de E-mail',
        html: '<div style="text-align:center"><p> Bruno, </br> Ocorreu um erro no sistema de emails. </br>O arquivo de log se encontra no servidor para ser verificado. </p></div>'
    };
    return transporter.sendMail(mailOptions,function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports ={
    enviarEmail : enviarEmail
} 