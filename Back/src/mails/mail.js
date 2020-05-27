var nodemailer = require('nodemailer');
const User = process.env.user || require('./creds').user;
const Pass = process.env.pass || require('./creds').pass;
var MailCompleto;
var Persona;
var Proposito;
var newHtml;

//El origen del mail
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: User,
    pass: Pass
  }
});

function PrepareEmail(req, res){

  var Destination = req.body.Destination
  var Purpose = req.body.Purpose
  var Content = req.body.Content
  //console.log(req.body)
  //console.log(req.body.RelevantInfo.name)
  var RelevantInfo = req.body.RelevantInfo

  // 1 = registro nuevo
  // 2 = registro aprobado
  // 3 = registro negado
  // 4 = alguien se unio a tu evento
  // 5 = tu te uniste a un evento
  PrepareSubject(Purpose);

  // Del 1 al 6 son problemas

  /*
    1 - Carrera esta mal
    2 - Foto mal porque hay varias personas
    3 - Matricula no es legible
    4 - Matricula no existe
    5 - Am
    6 - Foto sin Credencial
  */

  // El 7 es registro aprovado por la admin, va a la chica
  // El 8 es un registro nuevvo para el admin
  // El 11 es un registro nuevo para la chica que lo creo

  // * = usan relevant info.
  //* El 9 es para cuando alguien se une al evento, para la creadora
  //* El 10 es para cuando alguien se une al evento, para la que se unio
  PrepareBody(Content,RelevantInfo);

  MailCompleto = {
    from: '"#MisAmigasMeCuidan" <misamigasmecuidan.itesm@gmail.com>',
    to: Destination,
    subject: Proposito,
    html: newHtml
  };

  ReadyMail();

}

function PrepareSubject(number){

  switch (number) {
      // Para admin y usuaria cuando se haga registro
      case 1:
        Proposito = 'Notificación de registro'
          break;
      // Cuando la chica es aprobada por admin
      case 2:
        Proposito = 'Registro aprobado'
        break;
      // Cuando la chica es negada
      case 3:
        Proposito = 'Registro rechazado'
        break;
      // Una chica se une a tu evento
      case 4:
        Proposito = 'Actualización de evento'
        break;
      // Tu te uniste a un evento
      case 5:
        Proposito = 'Registrada a evento'
        break;
      
        default:

    }

}

function PrepareBody(number, RelevantInfo){

  switch (number) {
      // Carrera no existe
      case 1:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Carrera no existe</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro debido a la siguiente razón:</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>La carrera o departamento ingresado no existe en el sistema del Tec.</i></h3>
                  <h4>Recuerda que la foto debe incluirte a ti sosteniendo tu credencial donde se pueda ver claramente la matrícula, nombre, carrera/departamento y foto. Ingresa nuevamente tu información en la página del registro: link</h4>
                  <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                  <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
          break;
      // Más de una persona
      case 2:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Foto con más de una persona</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro debido a la siguiente razón:</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>La foto que compartiste muestra más de una persona.</i></h3>
                  <h4>Recuerda que la foto debe incluirte a ti sosteniendo tu credencial donde se pueda ver claramente la matrícula, nombre, carrera/departamento y foto. Ingresa nuevamente tu información en la página del registro: link</h4>
                  <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                  <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
        break;
      // Matrícula ilegible
      case 3:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Matrícula ilegible</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro debido a la siguiente razón:</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>La foto que compartiste muestra una matrícula ilegible.</i></h3>
                  <h4>Recuerda que la foto debe incluirte a ti sosteniendo tu credencial donde se pueda ver claramente la matrícula, nombre, carrera/departamento y foto. Ingresa nuevamente tu información en la página del registro: link</h4>
                  <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                  <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
        break;
      // Matrícula no existe
      case 4:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Matrícula no existe</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro debido a la siguiente razón:</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>La matrícula ingresada no existe en el sistema del Tec.</i></h3>
                  <h4>Recuerda que la foto debe incluirte a ti sosteniendo tu credencial donde se pueda ver claramente la matrícula, nombre, carrera/departamento y foto. Ingresa nuevamente tu información en la página del registro: link</h4>
                  <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                  <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
        break;
      // Otro
      case 5:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Otro</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro.</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>Favor de responder este correo para revisar junto a ti el porqué no fue aceptado tu registro.</i></h3>
                  <h1 style="color: purple;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
        break;
      // Sin credencial
      case 6:
        newHtml = `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Foto sin credencial</title>
                </head>
                <body>
                  <h3 style="margin-bottom: 0px;">Hola Sorora, hemos revisado y hemos denegado su registro debido a la siguiente razón:</h3>
                  <h3 style="margin-top: 0px; color: purple;"><i>La foto que compartiste no muestra tu credencial del Tec.</i></h3>
                  <h4>Recuerda que la foto debe incluirte a ti sosteniendo tu credencial donde se pueda ver claramente la matrícula, nombre, carrera/departamento y foto. Ingresa nuevamente tu información en la página del registro: link</h4>
                  <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                  <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                </body>
                </html>`
        break;
        // Aprobada
      case 7:
        newHtml = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Aprobada</title>
                  </head>
                  <body>
                    <h3 style="margin-bottom: 0px;">Hola Sorora, ¡tu cuenta ha sido aprobada!</h3>
                    <h4>Para iniciar sesión, entra al siguiente link: link</h4>
                    <h4 style="margin-bottom: 0px;">Cualquier duda que tengas, puedes mandar a este mismo correo.</h4>
                    <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                  </body>
                  </html>`
        break;
        // Administradora
      case 8:
        newHtml = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Notificación para administradora</title>
                  </head>
                  <body>
                    <h3 style="margin-bottom: 0px;">Hola administradora, tienes un nuevo registro que revisar.</h3>
                    <h4>Para iniciar sesión, entra al siguiente link: link</h4>
                    <h1 style="color: purple;">#MisAmigasMeCuidan</h1>
                  </body>
                  </html>`
        break;
        // Invitacion a creadora de evento
      //---------------De aqui para abajo hay relevant info
      case 9:
        newHtml = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Invitación a creadora</title>
                  </head>
                  <body>
                    <h3 style="margin-bottom: 0px;">Hola Sorora, se han unido a tu evento, esta es su información:</h3>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Nombre: ${RelevantInfo.name}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Matrícula: ${RelevantInfo.matr}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Celular: ${RelevantInfo.cel}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Carrera / Departamento: ${RelevantInfo.dep}</h4>
                    <h4 style="margin-top: 0px">Rol: ${RelevantInfo.rol}</h4>
                    <h4>Favor de ponerte en contacto con ella.</h4>
                    <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                    <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                  </body>
                  </html>`
        break;
        // Invitacion a subscrita de evento
      case 10:
        newHtml = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Invitación a creadora</title>
                  </head>
                  <body>
                    <h3 style="margin-bottom: 0px;">Hola Sorora, te has unido a un evento, esta es la información de la creadora:</h3>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Nombre: ${RelevantInfo.name}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Matrícula: ${RelevantInfo.matr}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Celular: ${RelevantInfo.cel}</h4>
                    <h4 style="margin-bottom: 0px; margin-top: 0px">Carrera / Departamento: ${RelevantInfo.dep}</h4>
                    <h4 style="margin-top: 0px">Rol: ${RelevantInfo.rol}</h4>
                    <h4>Favor de ponerte en contacto con ella.</h4>
                    <h4 style="margin-bottom: 0px;">Cualquier inconveniente, favor de responder a este correo.</h4>
                    <h1 style="color: purple; margin-top: 0px;">#MisAmigasMeCuidan</h1>
                  </body>
                  </html>`
        break;
        // Registro
      //---------------
      case 11:
        newHtml = `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Notificación para administradora</title>
                  </head>
                  <body>
                    <h3>Hola Sorora, acabas de realizar tu registro. Por favor espera a que revisen tu registro y te notificarán sobre tu estado de registro.</h3>
                    <h1 style="color: purple;">#MisAmigasMeCuidan</h1>
                  </body>
                  </html>`
        break;
      default:
    }

}

function ReadyMail(){

  console.log(MailCompleto);

  transporter.sendMail(MailCompleto, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log('Email sent: ' + info.response);
    }
  })
}

/*
var mailOptionsAprobada = {
  from: '"#MisAmigasMeCuidan" <misamigasmecuidan.itesm@gmail.com>',
  to: 'a01281445@itesm.mx',
  subject: 'Revisión de registro',
  html: newHtml
};

var mailOptionsEvento = {
  from: '"#MisAmigasMeCuidan" <misamigasmecuidan.itesm@gmail.com>',
  to: 'a01281445@itesm.mx',
  subject: 'Notificación del evento',
  html: newHtml
};

var mailOptionsRegistro = {
  from: '"#MisAmigasMeCuidan" <misamigasmecuidan.itesm@gmail.com>',
  to: 'a01281445@itesm.mx',
  subject: 'Nueva notificación de un registro',
  html: newHtml
};



); 

*/

 module.exports = { 
    PrepareEmail
  }