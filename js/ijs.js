var menuAct="info";
var menuAnt;

//al cargar por completo la página...
window.onload = function(){

	//Seleccion del menu
	document.getElementById("info").onclick = function(){
		borrarTodo();
		mostrarInfo();
	}
	document.getElementById("exam").onclick = function(){
		borrarTodo();
		mostrarExam();
	}
}

// Navegar por el menú superior

function mostrarInfo(){
	document.getElementById("info").style.textDecoration="underline";
	document.getElementById("infoDiv").style.display="block";
}
function mostrarExam(){
	document.getElementById("exam").style.textDecoration="underline";
	document.getElementById("examDiv").style.display="block";
}
function borrarTodo(){
	document.getElementById("info").style.textDecoration="none";
	document.getElementById("exam").style.textDecoration="none";
	document.getElementById("infoDiv").style.display="none";
	document.getElementById("examDiv").style.display="none";
}