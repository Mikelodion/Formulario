window.onload = function(){ 

 //CORREGIR al apretar el botón

 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml.xml", true);
 xhttp.send();
}

function ponerDatosInputHtml(t, i){
	document.getElementsByTagName("h4")[i].innerHTML = t;
}
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
	for (var i = 0; i <10; i++) {
	 	var tituloInput=xmlDoc.getElementsByTagName("text")[i].innerHTML;
 		ponerDatosInputHtml(tituloInput, i);
	}
}