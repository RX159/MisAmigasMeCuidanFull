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
	  			<h3>${$('#titulo').val()}</h3>
	  			<p>${$('#descripcion').val()}</p>
	  		</div>
	  	</div>`);
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
			<div class="card">
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
	document.getElementById('lugar').value = '';
	document.getElementById('hora-inicio').value = '';
	document.getElementById('hora-fin').value = '';
	document.getElementById('descripcion2').value = '';
	document.getElementById('fecha').value = '';
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'detalles-button') {
          modal3.style.display = "block";
          modal3.innerHTML = `
	  		<div class="modal-content">
				<span id= close class="close3">&times;</span>
				<p style="margin: 5px;
				margin-top:30px;">Lugar: </p><br>
				<br>
				<p style="margin: 5px;">Fecha: </p><br>
				<br>
				<p style="margin: 5px;">Hora inicio: </p><br>
				<br>
				<p style="margin: 5px;">Hora fin: </p><br>
				<br >
				<p style="margin: 5px;">Descripción: </p><br>
		    </div>
	  	</div>`;
    }
    if (e.target && e.target.id == 'acompanar-button') {
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


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();