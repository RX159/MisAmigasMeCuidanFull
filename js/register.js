console.log("ENTRE MAMON")
$('#signup_button').on('click', (function(event) {

  let $name = $('#name')
  let $name_empty = $('#name-empty')

  let $id = $('#id')
  let $id_empty = $('#id-empty')
  let $id2_empty = $('#id2-empty')

  let $major = $('#major')
  let $major_empty = $('#major-empty')

  let $role = $("input:radio[name=role]:checked").val();
  
  let $password = $('#password')
  let $password_empty = $('#password-empty')
  let $password_confirm = $('#password-confirm')
  let $passwordconfirm1_empty = $('#passwordconfirm1-empty')
  let $passwordconfirm2_empty = $('#passwordconfirm2-empty')

  let $cel = $('#celular')
  let $cel_empty = $('#cel-empty')

  let $photo = $('#photo2')
  let $photo_empty = $('#photo-empty')

  let $p_instruction = $('#p-instruction')
  var ParaMail = 0


  if($name.val() == '') {
    $name_empty.removeClass('hidden')
  } else {
    if(validation_name($name.val())) {
      $name_empty.addClass('hidden')
    } else {
      $name_empty.removeClass('hidden')
      $name_empty.text('Tu nombre solo deberia tener')
    }
  }

  if($id.val() == '') {
    $id2_empty.addClass('hidden')
    $id_empty.removeClass('hidden')
  } else {
    if(validation_matricula($id.val())) {
      $id.addClass('hidden')
      $id_empty.addClass('hidden')
    } else {
      $id2_empty.addClass('hidden')
      $id_empty.removeClass('hidden')
      $id_empty.text('Este email no es valido')
    }
  }

if($major.val() == '') {
    $major_empty.removeClass('hidden')
  } else {
    if(validation_name($major.val())) {
      $major_empty.addClass('hidden')
    } else {
      $major_empty.removeClass('hidden')
      $major_empty.text('No puedes dejar esto vacío')
    }
  }

  if($password.val() == '') {
    $password_empty.removeClass('hidden')
  } else {
    $password_empty.addClass('hidden')
  }

  if($password_confirm.val() == '') {
    $passwordconfirm1_empty.removeClass('hidden')
  } else {
    $passwordconfirm1_empty.addClass('hidden')
  }

  if($password_confirm.val() != $password.val() && $password_confirm.val() != '') {
    $passwordconfirm2_empty.removeClass('hidden')
  } else {
    $passwordconfirm2_empty.addClass('hidden')
  }

  if($cel.val() == '') {
    $cel_empty.removeClass('hidden')
  } else {
    if( validation_cel( $cel.val()) ) {
      $cel_empty.addClass('hidden')
    } else {
      $cel_empty.removeClass('hidden')
      $cel_empty.text('El celular son 10 numeros')
    }
  }

   if($photo.val() == '') {
    $photo_empty.removeClass('hidden')
  } else {
    $photo_empty.addClass('hidden')
  }

  // INICIO DE BACK //

  json_to_send = {
      "name": $name.val(),
      "tipoUsuario": $role,
      "email": $id.val()+"@itesm.mx",
      "password": $password.val(),
      "carrera": $major.val(),
      "celular": $cel.val(),
      "fotografia": $photo.val(),
      "validado": "no",
      "esTrans" : false
    }

    //alert($name);

    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
       url: 'https://misamigasmecuidan.herokuapp.com/users',//'http://localhost:3000/users', 
      //url: 'https://miniwebserverrx.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert("Successfully created");
        console.log('success: ' + data);
       
        //Mandar mail que te registraste
        //Mandar mail a la admin para que sepa

//la mandada de Mail --------------------------------------------------------------
    //console.log("Se mando primero este")
    //console.log(YoMerengue)
    
    //Para la chica
    localStorage.setItem("email",$id.val()+"@itesm.mx")


    console.log(localStorage.getItem('email'));

    json_to_send = {
          "Destination": localStorage.getItem('email'),
          "Purpose": 1,
          "Content": 11,
          "RelevantInfo": {}
        };

    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
        url: 'https://misamigasmecuidan.herokuapp.com/mail',//'http://localhost:3000/mail',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
          console.log("Succes 1")
        },
        error: function(error_msg) {
          console.log("Fail 1")
        }
        });

    
//Maldito Mail --------------------------------------------------------------------

//la mandada de Mail --------------------------------------------------------------
    //console.log("Se mando primero este")
    //console.log(YoMerengue)
    
    //localStorage.setItem("email",$id.val()+"@itesm.mx")
    //Para la admin
    console.log(localStorage.getItem('email'));

    json_to_send = {
          "Destination": "misamigasmecuidan.itesm@gmail.com",//localStorage.getItem('email'),
          "Purpose": 1,
          "Content": 8,
          "RelevantInfo": {}
        };

    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
        url: 'https://misamigasmecuidan.herokuapp.com/mail',//'http://localhost:3000/mail',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
          console.log("Succes 2")
        },
        error: function(error_msg) {
          console.log("Fail 2")
          window.location = '../index.html'
        }
        });

    
//Maldito Mail --------------------------------------------------------------------
        setTimeout(() => { window.location = '../index.html'; }, 3000);
       //window.location = '../index.html'
      },
      error: function(error_msg) {
        if($id.val() != '') {
          console.log(error_msg)
          $id2_empty.removeClass('hidden')
        }
      }
    })

  // // FIN DE BACK //



function validation_matricula(matricula) {
    var regexp_matricula = /\S\d+/
    return regexp_matricula.test(matricula)
  }

function validation_name(name) {
    var regexp_name = /^[A-Za-z]/
    return regexp_name.test(name)
  }

function validation_cel(cel) {
    var regexp_cel = /\d\d\d\d\d\d\d\d\d\d/
    return regexp_cel.test(cel)
  }

}))
