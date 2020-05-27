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

	if(pageName == 'Admin')
	{
		modal = modalPendientes
	}
	else if(pageName == 'Revisadas')
	{
		modal = modalRevisadas
	}
}

//Ricky creacion 0
var token = localStorage.getItem('token');
if (token) { token = token.replace(/^"(.*)"$/, '$1'); }
// Fin creacion Ricky

var modal;
var modalPendientes = document.getElementById("admin-modal-Pendientes");
var modalRevisadas = document.getElementById("admin-modal-Revisadas");
var modalApprove = document.getElementById("admin-modal-aprobar");
var modalDeny = document.getElementById("admin-modal-denegar");
var btnReview = document.getElementById("revisar-button");
var spanClose = document.getElementsByClassName("close")[0];
var btnSend = document.getElementById("modal-confirmar-button");
var btnCancel = document.getElementById("modal-cancelar-button");
var Nombre;
var Email;
var Carrera;
var TipoU;
var Foto;
var BtnLogOff = document.getElementById("LogOff");
var Encontrar2;
var Razon = document.getElementById("dropdown-razon");
var Comment = document.getElementById("comentario");

//Users
function loadUsers() {
  //console.log("entro al load")
  $.ajax({
    url: 'http://localhost:3000/users',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      for( let i = 0; i < data.length; i++) {
      	if(data[i].validado)
      	{
      		if(data[i].validado != "si")
      		{
      			LoadUsers(data[i]._id, data[i].name, data[i].email)
      		}      		
      	}
      }
      for( let i = 0; i < data.length; i++) {
      	if(data[i].validado)
      	{
      		if(data[i].validado == "si")
      		{
       			LoadDoneUsers(data[i]._id, data[i].name, data[i].email)
      		}
      		
      	}
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadUsers()

function LoadUsers(id, Nombre, Correo) {
	modalPendientes.style.display = "none";

	$('#Pendientes').append(
		`<tr>
		    <td>${Nombre}</td>
		    <td>${Correo}</td>
		    <td><button id="revisar-button" class="button-add" yo=${id}>Revisar</button></td>
		  </tr>`
	);
}

function LoadDoneUsers(id, Nombre, Correo) {
	modalRevisadas.style.display = "none";

	$('#RevisadasT').append(
		`<tr>
		    <td>${Nombre}</td>
		    <td>${Correo}</td>
		  </tr>`
	);
}

document.addEventListener('click', function(e) {
	Click = 0;
    if (e.target && e.target.id == 'revisar-button') {
        
        var encontrar = e.target.attributes.yo.value;
        $.ajax({
	    url: 'http://localhost:3000/users/'+encontrar,
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
    	dataType: 'json',
    	success: function(data){
    		Nombre = data.name;
	        Email = data.email.substring(0,9);
	        Carrera = data.carrera;
	        TipoU = data.tipoUsuario;
	        Foto = data.fotografia;
    		//console.log(Foto);
    		//console.log(Nombre);
    		console.log(  );
    	
    		modal.style.display = "block";
			modal.innerHTML = `
	  		<div class="admin-card">
			<iframe src=${Foto} width="300" height="400"></iframe>
			<p>Nombre: ${Nombre}</p>
			<p>Matrícula: ${Email}</p>
			<p>Carrera o departamento: ${Carrera}</p>
			<p>Rol: ${TipoU}</p><br>
			<p><button id="aprobar-button" class="admin-button" yo=${encontrar}>Aprobar</button></p>
			<p><button id="denegar-button" class="admin-button" yo=${encontrar}>Denegar</button></p>
			</div>`;
    	},error: function(error_msg) {}
    	});        
    }
    if (e.target && e.target.id == 'aprobar-button') {

    	var encontrar = e.target.attributes.yo.value;
    	Encontrar2 = encontrar;

        modalApprove.style.display = "block";
        modalApprove.innerHTML = `
	  	<div class="modal-content">
	  		<span id=close class="close">&times;</span>
			<p style="margin: 5px;
			margin-top:70px;
			text-align: center;">¿Segura que quieres aprobar el registro de esta cuenta?</p><br>
			<br>
			<div style="text-align: center;
			margin-bottom: 50px;">
				<button id="cancelar-button" class="button-sub">Cancelar</button>
				<button id="confirmar-button2" class="button-add">Confirmar</button>
			</div>
			<br>
		</div>`; 
    }
    if (e.target && e.target.id == 'denegar-button') {

    	var encontrar = e.target.attributes.yo.value;
    	Encontrar2 = encontrar;
    	//console.log(Encontrar2);
        modalDeny.style.display = "block";
	}
    if (e.target && e.target.id == 'close') {
		modalApprove.style.display = "none";
    }
    if (e.target && e.target.id == 'cancelar-button') {
		modalApprove.style.display = "none";
    }
    if (e.target && e.target.id == 'confirmar-button2') {
		
		//var encontrar = e.target.attributes.yo.value;
		//console.log("Aja, entre")
		json_to_send = {
			"validado" : "si"
		  };
		
		  json_to_send = JSON.stringify(json_to_send);

		$.ajax({
			url: 'http://localhost:3000/users/'+Encontrar2,
			headers: {
				'Content-Type':'application/json',
				'Authorization': 'Bearer ' + token
			},
			method: 'PATCH',
			dataType: 'json',
			data: json_to_send,
			success: function(data){
				//Aqui va el mail cuando te aceptan
			},
			error: function(error_msg) {
			  alert("No se encontro el usuario");
			  //alert((error_msg['responseText']));
			}
		  });

		modal.style.display = "none";
		modalApprove.style.display = "none";
    }
    if (e.target && e.target.id == 'modal-confirmar-button') {
    	
    	//var encontrar = document.cookie;
    	//console.log(e.target);
    	//console.log(Razon.options[Razon.selectedIndex].value);
		var NegadoX = "no, porque " + Razon.options[Razon.selectedIndex].text + " y " + Comment.value;
		NegadoX = NegadoX.toLowerCase();
		//console.log(NegadoX);
		//console.log(Comment.value)
		
		json_to_send = {
			"validado" : NegadoX
		  };
		
		  json_to_send = JSON.stringify(json_to_send);
		  //No fuiste aceptada porque la foto no es clara
		$.ajax({
			url: 'http://localhost:3000/users/'+Encontrar2,
			headers: {
				'Content-Type':'application/json',
				'Authorization': 'Bearer ' + token
			},
			method: 'PATCH',
			dataType: 'json',
			data: json_to_send,
			success: function(data){

//la mandada de Mail --------------------------------------------------------------
		//console.log("Se mando primero este")
		//console.log(YoMerengue)
		/*
		    1 - Carrera esta mal
		    2 - Foto mal porque hay varias personas
		    3 - Matricula no es legible
		    4 - Matricula no existe
		    5 - Am
		  	6 - Foto sin Credencial
		*/

		/*
		1 - <option value="sin-credencial">Foto sin la credencial</option>
		2 - <option value="mas-personas">Foto con más de una persona</option>
		3 - <option value="ilegible">Matrícula ilegible en la foto</option>
		4 - <option value="no-mujer">En la foto no se encuentra una mujer</option>
		5 - <option value="no-matricula">La matrícula no existe en el sistema del Tec</option>
		6 - <option value="no-carrera">La carrera no existe</option>
		*/		

		var Contenido = 0;
		Console.log(Razon.selectedIndex);

		switch(Razon.selectedIndex)
		{
			case 0 : Contenido = 6;
			break;
			case 1 : Contenido = 2;
			break;
			case 2 : Contenido = 3;
			break;
			case 3 : Contenido = 5;
			break;
			case 4 : Contenido = 4;
			break;
			case 5 : Contenido = 1;
			break;
		}

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
					"Content": Contenido,
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

				//Madar mail que fue negada
				//Razon.options[Razon.selectedIndex] nos dara el motivo/ el template a mandar

			},
			error: function(error_msg) {
			  alert("No se encontro el usuario");
			  //alert((error_msg['responseText']));
			}
		  });
		
    	modal.style.display = "none";
		modalApprove.style.display = "none";
    }
     if (e.target && e.target.id == btnCancel) {
		 modalDeny.style.display = "none";
    }
    if (e.target && e.target.id == btnSend) {
		 modal.style.display = "none";
		 modalDeny.style.display = "none";
     }
   if(e.target && e.target.id == 'admin-modal-Pendientes')
   {
   	modal.style.display = "none";
	modalDeny.style.display = "none";
	modalApprove.style.display= "none";
   }
   
   //console.log(e.target);
 });

btnCancel.onclick = function() {
	modalDeny.style.display = "none";
}

btnSend.onclick = function() {

	modal.style.display = "none";
	modalDeny.style.display = "none";
}

spanClose.onclick = function() {
	modalDeny.style.display = "none";
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

// Se cierra el modal al presionar fuera de este mismo
window.onclick = function(event) {
	
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();