function openPage(pageName, elmnt, color) {
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
var YoMerengue = localStorage.getItem('YoActual');
if (token) { token = token.replace(/^"(.*)"$/, '$1'); }
// Fin creacion Ricky

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var spanClose = document.getElementsByClassName("close")[0];
var spanClose2 = document.getElementsByClassName("close2")[0];
var spanClose3 = document.getElementsByClassName("close3")[0];
var btnAdd1 = document.getElementById("plus-button-1");
var btnAdd2 = document.getElementById("plus-button-2");
var btnPublish = document.getElementById("publish-button");
var btnPublish2 = document.getElementById("publish-button-2");
var BtnLogOff = document.getElementById("LogOff");
var CInvo;
var Encontrar2;

//Inicio de Metio Ricky
//Al cargarse la pagina debe tratar de conseguir todas las tarjetas que ya existen
//Posts
function loadPosts() {
  //console.log("entro al load")
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

	$('#id-card-1').prepend(
		`<div class="column">
			<div class="card">
				<div class="padding">
		  			<h3>${asunto}</h3>
		  			<p>${historia}</p>
		  		</div>
	  			<div class="sticky"></div>
	  		</div>
	  	</div>`);

}

//Eventos
function loadEvents() {
  //console.log("entro al load")
  $.ajax({
    url: 'http://localhost:3000/eventos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      for( let i = 0; i < data.length; i++) {

      	var YaToy = false;

      	for( let y = 0; y < data[i].involucradasCount; y++) {
		      	if(data[i].involucradas[y] == YoMerengue)
		      	{
		      		YaToy = true;
		      	}
		     }

        LoadEvents(data[i]._id, data[i].titulo, data[i].horaI, data[i].horaF, data[i].lugarInicial ,data[i].descripcion, YaToy, data[i].creadoPor)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadEvents()

function LoadEvents(id, titulo, horaI, horaF, lugar, descripcion,Inscrita, Creadora) {
	modal.style.display = "none";
	var btnAcomp;

	if(Inscrita)
	{
		btnAcomp = `` ;
	}
	else
	{
		btnAcomp = `<button id="acompanar-button" class="button-add"code = ${id} creadora = ${Creadora}>Acompañar</button>` ;
	}

	//console.log(tituloComp)
	$('#id-card-2').prepend(
		`<div class="column">
			<div class="cardEvent">
	  			<h3>${lugar}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-bottom: -1px">Fecha: ${titulo}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-top: 0px;
 					margin-bottom: -1px;">Hora inicio: ${horaI}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-top: -0.5px">Hora fin: ${horaF}</h3>
	  			
	  			<i id="detalles-button" class="fa fa-ellipsis-h tooltip" aria-hidden="true" code = ${id} group = 1>
	  				<span class="tooltiptext">Presiona para leer todos los detalles</span>
	  			</i><br>
	  			<br>
	  			${btnAcomp}
	  		</div>
	  	</div>`);

}

/*
var Detalles = document.getElementsByClassName("fa fa-ellipsis-h tooltip");

Detalles.onclick = function() {
	console.log(this);
}

console.log(Detalles)
*/

//Fin de Metio Ricky

// Se abre el modal del Tendedero
btnAdd1.onclick = function() {
	modal.style.display = "block";
}

// Se publica en el Tendedero después de presionar el botón
btnPublish.onclick = function() {
	modal.style.display = "none";
	$('#id-card-1').prepend(
		`<div class="column">
			<div class="card">
				<div class="padding">
	  				<h3>${$('#titulo').val()}</h3>
	  				<p>${$('#descripcion').val()}</p>
	  			</div>
	  			<div class="sticky"></div>
	  		</div>
	  	</div>`);

// Inico cambio 2 Ricky
//Create Post a Mongo
	json_to_send = {
      "asunto": $('#titulo').val(),
      "historia": $('#descripcion').val()
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



// Se cierra el modal al presionar la x
spanClose.onclick = function() {
	modal.style.display = "none";
}

// Se publica en el Acompañar
btnAdd2.onclick = function() {
	modal2.style.display = "block";
}

// Se publica en Acompañar después de presionar el botón
btnPublish2.onclick = function() {
	modal2.style.display = "none";
	$('#id-card-2').prepend(
		`<div class="column">
			<div class="cardEvent">
	  			<h3>${$('#lugar').val()}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-bottom: -1px">Fecha: ${$('#fecha').val()}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-top: 0px;
 					margin-bottom: -1px;">Hora inicio: ${$('#hora-inicio').val()}</h3>
	  			<h5 style="border-style: solid;
 					border-color: #ccccff;
 					border-width: thin;
 					padding: 5px;
 					margin-top: -0.5px">Hora fin: ${$('#hora-fin').val()}</h3>
	  			
	  			<i id="detalles-button" class="fa fa-ellipsis-h tooltip" aria-hidden="true">
	  				<span class="tooltiptext">Presiona para leer todos los detalles</span>
	  			</i><br>
	  			<br>
	  			<button id="acompanar-button" class="button-add">Acompañar</button>
	  		</div>
	  	</div>`);

// Inico cambio 3 Ricky
	//Create Evento a Mongo


	json_to_send = {
      "titulo": $('#lugar').val(),
      "horaI": $('#hora-inicio').val(),
      "horaF": $('#hora-fin').val(),
      "descripcion": $('#descripcion2').val(),
      "fecha": $('#fecha').val(),
       "lugarInicial":$('#lugar').val()
    }

    json_to_send = JSON.stringify(json_to_send);

    console.log(json_to_send)

    $.ajax({
       url: 'http://localhost:3000/eventos',
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
// Fin cambio 3 Ricky, Me mamas Javi
	document.getElementById('lugar').value = '';
	document.getElementById('hora-inicio').value = '';
	document.getElementById('hora-fin').value = '';
	document.getElementById('descripcion2').value = '';
	document.getElementById('fecha').value = '';
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'detalles-button') {
    	var encontrar = e.target.attributes.code.value;


	    $.ajax({
	    url: 'http://localhost:3000/eventos/'+ encontrar,
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){

	    	/*
	    	const today = new Date();
	    	const Hoy = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	    	//console.log(data.fecha);
	    	//console.log(Hoy);
			const CuandoEs = new Date(data.fecha);
			console.log(CuandoEs);
			console.log(Hoy);
			const diffTime = Math.abs(CuandoEs - Hoy);
			console.log(diffTime);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
			*/
	    	console.log(data.fecha);
	   		modal3.style.display = "block";
         	modal3.innerHTML = `
	  		<div class="modal-content">
				<span id= close class="close3">&times;</span>
				<p style="margin: 5px;
				margin-top:30px;"><b>Lugar:</b> ${data.lugarInicial} </p><br>
				<br>
				<p style="margin: 5px;"><b>Fecha:</b> ${data.fecha.substring(8, 10)}/${data.fecha.substring(5, 7)}/${data.fecha.substring(0, 4)} </p><br>
				<br>
				<p style="margin: 5px;"><b>Hora inicio:</b> ${data.horaI} </p><br>
				<br>
				<p style="margin: 5px;"><b>Hora fin:</b> ${data.horaF} </p><br>
				<br >
				<p style="margin: 5px;"><b>Descripción:</b> ${data.descripcion} </p><br>
		    </div>
	  	</div>`;
	      
	    },
	    error: function(error_msg) {
	      alert((error_msg['responseText']));
	    	}
	  	});
    }
    if (e.target && e.target.id == 'acompanar-button') {
    	Encontrar2 = e.target.attributes.code.value;
    	//console.log(e.target.attributes.creadora.value)
    	localStorage.setItem("creadora", e.target.attributes.creadora.value)

    	//Ecnontrar la lista de involucradas
		$.ajax({
	    url: 'http://localhost:3000/eventos/'+ Encontrar2,
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	var YaTa=false;
	    	CInvo = data.involucradas;
	    	for( let i = 0; i < data.involucradasCount; i++) {
		      	if(data.involucradas[i] == YoMerengue)
		      	{
		      		YaTa = true;
		      	}
		     }

		    if(YaTa == false)
		    {
		    	CInvo[data.involucradasCount] = YoMerengue;
		    }
	    	
	    	//console.log(CInvo);

	    	//console.log("lo que se va a mandar");
			//console.log(CInvo);
			//console.log(CInvo.length);
			  
			
	    },
	    error: function(error_msg) {
	      alert((error_msg['responseText']));

	    }
	 	 });


          modal3.style.display = "block";
          modal3.innerHTML = `
	  		<div class="modal-content">
				<p style="margin: 5px;
				margin-top:70px;
				text-align: center;">¿Segura que quieres confirmar asistir a este lugar a la hora indicada?</p><br>
				<br>
				<div style="text-align: center;
				margin-bottom: 50px;">
					<button id="cancelar-button" class="button-sub">Cancelar</button>
					<button id="confirmar-button" class="button-add">Confirmar</button>
				</div>
				<br>
		    </div>
	  	</div>`;
    }
    if (e.target && e.target.id == 'close') {
		modal3.style.display = "none";
    }
    if (e.target && e.target.id == 'cancelar-button') {
		modal3.style.display = "none";
    }
    if (e.target && e.target.id == 'confirmar-button') {
		//console.log(e.target.attributes);
		//var encontrar = e.target.attributes.code.value;
		//var YoMerengue = localStorage.getItem('YoActual');
		
		//console.log("lo que se va a mandar");
		//	console.log(CInvo);
		//	console.log(CInvo.length);
		

		json_to_send = {
				"involucradasCount" : CInvo.length,
				"involucradas" : CInvo
			  };

			  json_to_send = JSON.stringify(json_to_send);
		//console.log(YoMerengue);
		//CInvo[CInvo.length] = YoMerengue;
		//console.log(CInvo);
		//Updatear la lista de involucradas para contarme a mi

		$.ajax({
				url: 'http://localhost:3000/eventos/'+Encontrar2,
				headers: {
					'Content-Type':'application/json',
					'Authorization': 'Bearer ' + token
				},
				method: 'PATCH',
				dataType: 'json',
				data: json_to_send,
				success: function(data){
					alert("Te registraste");
					//La funcion de Mail para ambas

				},
				error: function(error_msg) {
				  alert("No se encontro el usuario");
				  //alert((error_msg['responseText']));
				}
			  });

//la mandada de Mail --------------------------------------------------------------
		console.log("Se mando primero este")
		console.log(YoMerengue)
		$.ajax({
		    url: 'http://localhost:3000/users/'+YoMerengue,
		    headers: {
		        'Content-Type':'application/json',
		        'Authorization': 'Bearer ' + token
		    },
		    method: 'GET',
		    dataType: 'json',
		    success: function(data){
		      //console.log(data)
		      localStorage.setItem("email",data.email)
		      localStorage.setItem("name",data.name)
		      localStorage.setItem("matricula",data.email.substring(0, 9))
		      localStorage.setItem("cel",data.celular)
		      localStorage.setItem("dep",data.carrera)
		      localStorage.setItem("rol",data.tipoUsuario)

		    },
		    error: function(error_msg) {
		      
		    }
		  });

		json_to_send = {
					"Destination": "A01281564@itesm.mx",//localStorage.getItem('email'),
					"Purpose": 5,
					"Content": 10,
					"RelevantInfo": {
						"name": localStorage.getItem('name'),
						"matr": localStorage.getItem('matricula'),
						"cel": localStorage.getItem('cel'),
						"dep": localStorage.getItem('dep'),
						"rol": localStorage.getItem('rol')
					}
				};

		console.log(json_to_send)

		json_to_send = JSON.stringify(json_to_send);

		$.ajax({
				url: 'http://localhost:3000/mail',
				headers: {
					'Content-Type':'application/json',
					'Authorization': 'Bearer '
				},
				method: 'POST',
				dataType: 'json',
				data: json_to_send,
				success: function(data){

				},
				error: function(error_msg) {

				}
			  });

		
//Maldito Mail --------------------------------------------------------------------

//la mandada de Mail --------------------------------------------------------------
		console.log("Se mando segundo este")
		console.log(localStorage.getItem('creadora'))
		var Mother = localStorage.getItem('creadora')
		$.ajax({
		    url: 'http://localhost:3000/users/'+Mother,
		    headers: {
		        'Content-Type':'application/json',
		        'Authorization': 'Bearer ' + token
		    },
		    method: 'GET',
		    dataType: 'json',
		    success: function(data){

		      console.log(data)
		      localStorage.setItem("Cemail",data.email)
		      localStorage.setItem("Cname",data.name)
		      localStorage.setItem("Cmatricula",data.email.substring(0, 9))
		      localStorage.setItem("Ccel",data.celular)
		      localStorage.setItem("Cdep",data.carrera)
		      localStorage.setItem("Crol",data.tipoUsuario)

		    },
		    error: function(error_msg) {
		      
		    }
		  });

		json_to_send = {
					"Destination": "A01281564@itesm.mx",//localStorage.getItem('email'),
					"Purpose": 4,
					"Content": 9,
					"RelevantInfo": {
						"name": localStorage.getItem('Cname'),
						"matr": localStorage.getItem('Cmatricula'),
						"cel": localStorage.getItem('Ccel'),
						"dep": localStorage.getItem('Cdep'),
						"rol": localStorage.getItem('Crol')
					}
				};

		console.log(json_to_send)

		json_to_send = JSON.stringify(json_to_send);

		$.ajax({
				url: 'http://localhost:3000/mail',
				headers: {
					'Content-Type':'application/json',
					'Authorization': 'Bearer '
				},
				method: 'POST',
				dataType: 'json',
				data: json_to_send,
				success: function(data){

				},
				error: function(error_msg) {

				}
			  });

		
//Maldito Mail --------------------------------------------------------------------




		modal3.style.display = "none";
    }
 });

// Se cierra el modal al presionar la x
spanClose2.onclick = function() {
	modal2.style.display = "none";
}

// Se cierra el modal al presionar fuera de este mismo
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none"
	}
	if (event.target == modal2) {
		modal2.style.display = "none"
	}
	if (event.target == modal3) {
		modal3.style.display = "none"
	}
}

BtnLogOff.onclick = function() {

	if (confirm("¿Cerrar sesión?")) 
	{
		//console.log(localStorage.getItem('token'));
	    
	    json_to_send = {
	    	"tokens" : token
	    };

    	json_to_send = JSON.stringify(json_to_send);
    	
  
    	$.ajax({
	      url: 'http://localhost:3000/logout',
	      headers: {
	          'Content-Type':'application/json',
        	'Authorization': 'Bearer ' + token
	      },
	      method: 'POST',
	      dataType: 'json',
	      data: json_to_send,
	      success: function(data){

	      //localStorage.setItem('token', "")
		  window.location = '../index.html';
      	},
      	error: function(error_msg) 
      	{
      		window.location = '../index.html';
      		//console.log(error_msg);
        	//alert("Aja, no deberias estar aqui");
	    }
		});

	  //txt = "You pressed OK!";
	} else {
	  //txt = "You pressed Cancel!";
	}
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();