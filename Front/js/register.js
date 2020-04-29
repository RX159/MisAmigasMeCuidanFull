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

  let $photo = $('#photo')
  let $p_instruction = $('#p-instruction')




  if($name.val() == '') {
    $name_empty.removeClass('hidden')
  } else {
    if(validation_name($name.val())) {
      $name_empty.addClass('hidden')
    } else {
      $name_empty.removeClass('hidden')
      $name_empty.text('Your name should only have letters')
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
      $id_empty.text('This email is not valid')
    }
  }

if($major.val() == '') {
    $major_empty.removeClass('hidden')
  } else {
    if(validation_name($major.val())) {
      $major_empty.addClass('hidden')
    } else {
      $major_empty.removeClass('hidden')
      $major_empty.text('Your major should only have letters')
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

  // INICIO DE BACK //

  json_to_send = {
      "name": $name.val(),
      "tipoUsuario": $role,
      "email": $id.val()+"@itesm.mx",
      "password": $password.val(),
      "carrera": $major.val(),
      "celular": "123456789",
      "fotografia": "simon",
      "validado": "no"
    }

    //alert($name);

    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
       url: 'http://localhost:3000/users',
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
        window.location = '../index.html'
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
}))
