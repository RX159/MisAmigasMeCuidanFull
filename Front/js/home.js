function openPage(pageName,elmnt,color) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}
	document.getElementById(pageName).style.display = "block";
	elmnt.style.backgroundColor = color;
}

//Ricky creacion 0
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1');
}

// Fin creacion Ricky

var modal = document.getElementById("myModal");
var spanClose = document.getElementsByClassName("close")[0];
var btnAdd1 = document.getElementById("plus-button-1");
var btnAdd2 = document.getElementById("plus-button-2");
var btnPublish = document.getElementById("publish-button")

//Inicio de Metio Ricky
//Al cargarse la pagina debe tratar de conseguir todas las tarjetas que ya existen

function loadPosts() {
  console.log("entro al load")
  $.ajax({
    url: 'http://localhost:3000/posts',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      for( let i = 0; i < data.length; i++) {
        LoadPosts(data[i]._id, data[i].asunto, data[i].historia)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadPosts()


function LoadPosts(id, asunto, historia) {
	modal.style.display = "none";
	var tituloCard = asunto;
	var descripCard = historia;
	$('#id-card-1').prepend(
		`<div class="column">
			<div class="card">
	  			<h3>${asunto}</h3>
	  			<p>${historia}</p>
	  		</div>
	  	</div>`);

}

//Fin de Metio Ricky

// Se abre el modal del Tendedero
btnAdd1.onclick = function() {
	modal.style.display = "block";
}

// Se publica en el Tendedero después de presionar el botón
btnPublish.onclick = function() {
	modal.style.display = "none";
	var tituloCard = $('#titulo').val();
	var descripCard = $('#descripcion').val();
	$('#id-card-1').prepend(
		`<div class="column">
			<div class="card">
	  			<h3>${$('#titulo').val()}</h3>
	  			<p>${$('#descripcion').val()}</p>
	  		</div>
	  	</div>`);


// Inico cambio 2 Ricky

	json_to_send = {
      "asunto": tituloCard,
      "historia": descripCard
    }

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
       url: 'http://localhost:3000/posts',
      //url: 'https://miniwebserverrx.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert("Successfully created");
      },
      error: function(error_msg) {
        if($id.val() != '') {
          console.log(error_msg)
          $id2_empty.removeClass('hidden')
        }
      }
    })
// Fin cambio 2 Ricky, Me mamas Javi

	document.getElementById('titulo').value = '';
	document.getElementById('descripcion').value = '';

}

// Se publica en el Acompañar
btnAdd2.onclick = function() {
	$('#id-card-2').prepend(
		`<div class="column">
			<div class="card">
	  			<h3>Título con hora y lugar</h3>
	  			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	  	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	  	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	  	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	  	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	  	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	  		</div>
	  	</div>`);
}

// Se cierra el modal al presionar la x
spanClose.onclick = function() {
	modal.style.display = "none";
}

// Se cierra el modal al presionar fuera de este mismo
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none"
	}
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();