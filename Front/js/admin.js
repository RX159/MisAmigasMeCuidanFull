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
if (token) { token = token.replace(/^"(.*)"$/, '$1'); }
// Fin creacion Ricky

var modal = document.getElementById("admin-modal");
var modalApprove = document.getElementById("admin-modal-aprobar");
var modalDeny = document.getElementById("admin-modal-denegar");
var btnReview = document.getElementById("revisar-button");
var spanClose = document.getElementsByClassName("close")[0];
var btnSend = document.getElementById("modal-confirmar-button");
var btnCancel = document.getElementById("modal-cancelar-button");

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
      		if(data[i].validado == "no")
      		{
      			LoadUsers(data[i]._id, data[i].name, data[i].email)
      		}
      		else
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
	modal.style.display = "none";

	$('#admin-table').prepend(
		`<tr>
		    <td>${Nombre}</td>
		    <td>${Correo}</td>
		    <td><button id="revisar-button" class="button-add">Revisar</button></td>
		  </tr>`
	);
}

function LoadDoneUsers(id, Nombre, Correo) {
	modal.style.display = "none";

	$('#admin-table').prepend(
		`<tr>
		    <td><s>${Nombre}<s></td>
		    <td>${Correo}</td>
		    <td><button id="revisar-button" class="button-add">Revisar</button></td>
		  </tr>`
	);
}
//


document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'revisar-button') {
        modal.style.display = "block";
        modal.innerHTML = `
	  	<div class="admin-card">
			<img src="../images/foto-fabiana.png" alt="Fabiana" style="width:100%">
			<p>Nombre: Fabiana Serangelli</p>
			<p>Matrícula: A01281445</p>
			<p>Carrera o departamento: ITC</p>
			<p>Rol: Estudiante</p><br>
			<p><button id="aprobar-button" class="admin-button">Aprobar</button></p>
			<p><button id="denegar-button" class="admin-button">Denegar</button></p>
		</div>`;
    }
    if (e.target && e.target.id == 'aprobar-button') {
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
				<button id="confirmar-button" class="button-add">Confirmar</button>
			</div>
			<br>
		</div>`;
    }
    if (e.target && e.target.id == 'denegar-button') {
        modalDeny.style.display = "block";
    }
    if (e.target && e.target.id == 'close') {
		modalApprove.style.display = "none";
    }
    if (e.target && e.target.id == 'cancelar-button') {
		modalApprove.style.display = "none";
    }
    if (e.target && e.target.id == 'confirmar-button') {
    	modal.style.display = "none";
		modalApprove.style.display = "none";
    }
  //   if (e.target && e.target.id == btnCancel) {
		// modalDeny.style.display = "none";
  //   }
  //   if (e.target && e.target.id == btnSend) {
		// modal.style.display = "none";
		// modalDeny.style.display = "none";
  //   }
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

// Se cierra el modal al presionar fuera de este mismo
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none"
	}
	if (event.target == modalApprove) {
		modalApprove.style.display = "none"
	}
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();