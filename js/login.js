$('#login_button').on('click', function(){

    let id = $("#id")
    let id_empty = $("#id-empty")

    let password = $("#password")
    let password_empty = $("#password-empty")

    let credentials_incorrect = $('#credentials-incorrect')

    var MeVoy

    if (id.val() == ''){
        id_empty.removeClass('hidden')
    }
    else {
        id_empty.addClass('hidden')
    }

    if (password.val() == ''){
        password_empty.removeClass('hidden')
    }
    else {
        password_empty.addClass('hidden')
    }

    if(id.val().includes("@itesm.mx"))
    {
      json_to_send = {
      "email" : id.val(),
      "password" : password.val()
      };
    }
    else
    {
      json_to_send = {
      "email" : id.val()+"@itesm.mx",
      "password" : password.val()
      };
    }
    
    json_to_send = JSON.stringify(json_to_send);
  
    $.ajax({
      url: 'https://misamigasmecuidan.herokuapp.com/login',//'http://localhost:3000/login',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){

        if(data.user.tipoUsuario == "admin")
        {
          MeVoy =  'html/admin.html'
        }
        else
        {
          MeVoy =  'html/home.html'
        }
        
        if(data.user.validado == "no")
        {
          alert("Tu cuenta necesita ser validada");
        }
        else if(data.user.validado == "si")
        {
          alert("Login successfull!");
          localStorage.setItem('token', data.token)
          localStorage.setItem('YoActual', data.user.id)
          window.location = MeVoy
        }
        else
        {
          alert(data.user.validado);
        }
  
      },
      error: function(error_msg) {
        if (password.val() != ''){
          credentials_incorrect.removeClass('hidden')
        }
      }
    });
});
