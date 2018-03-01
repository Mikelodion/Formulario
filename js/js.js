
var url = "https://rawgit.com/Mikelodion/Formulario/master/xml/xml.xml";
var respuestasCheckbox = [];
var respuestasRadio = [];
var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
window.onload = function(){ 
 //CORREGIR al apretar el botón
 formElement=document.getElementById('contenedor');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirNumber();
    corregirSelect();
    corregirCheckbox();
    presentarNota();
   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET",url, true);
 xhttp.send();
}
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
	//Poner Titulos
	for (var i = 0; i <10; i++) {
	 	var tituloInput=xmlDoc.getElementsByTagName("text")[i].innerHTML;
 		ponerDatosInputHtml(tituloInput, i);
	}
	//Select
 	for (var b = 0; b<2; b++){
 		var opcionesSelect = [];
 		var nopt = xmlDoc.getElementById("select"+b).getElementsByTagName('option').length;
  		for (i = 0; i < nopt; i++) { 
   	 		opcionesSelect[i] = xmlDoc.getElementById("select"+b).getElementsByTagName('option')[i].innerHTML;
 		}
 		ponerDatosSelectHtml(opcionesSelect,b);
 	}
 	//Select Multiple
 	for(var b = 0; b<2; b++){
 		var opcionesSelectmultiple = [];
 		var noptm = xmlDoc.getElementById("multiple"+b).getElementsByTagName("option").length;
 		for(i=0; i<noptm; i++){
 			opcionesSelectmultiple[i] = xmlDoc.getElementById("multiple"+b).getElementsByTagName("option")[i].innerHTML;

 		}
 		ponerDatosSelectMultipleHtml(opcionesSelectmultiple,b);

 	}
 	//CHECKBOX
	for(b=0;b<2;b++){
		var opcionesCheckbox = [];
 		var noptcheck = xmlDoc.getElementById("check"+b).getElementsByTagName('option').length;
		for (i = 0; i < noptcheck; i++) { 
  	  		opcionesCheckbox[i]=xmlDoc.getElementById("check"+b).getElementsByTagName('option')[i].innerHTML;
 		}  
 		ponerDatosCheckboxHtml(opcionesCheckbox, b);
	}
 	for(b=0;b<2;b++){
 		var nres = xmlDoc.getElementById("check"+b).getElementsByTagName('answer').length;
 	
 		for (i = 0; i < nres; i++) { 
  			respuestasCheckbox[i]=xmlDoc.getElementById("check"+b).getElementsByTagName("answer")[i].innerHTML;
 		}
 	}
 	//Radio
	for(b=0;b<2;b++){
 		var opcionesRadio = [];
 		var noptradio = xmlDoc.getElementById("radio"+b).getElementsByTagName('option').length;
		for (i = 0; i < noptradio; i++) { 
  	  		opcionesRadio[i]=xmlDoc.getElementById("radio"+b).getElementsByTagName('option')[i].innerHTML;
 		}  
 		ponerDatosRadioHtml(opcionesRadio, b);
	}
 	for(b=0;b<2;b++){
 		var nres = xmlDoc.getElementById("radio"+b).getElementsByTagName('answer').length;
 		for (i = 0; i < nres; i++) { 
  			respuestasRadio[i]=xmlDoc.getElementById("radio"+b).getElementsByTagName("answer")[i].innerHTML;
 		}
 	}
}
function ponerDatosInputHtml(t, i){
	document.getElementsByTagName("h4")[i].innerHTML = t;
}
function ponerDatosSelectHtml(opt,b){
	
  		var select = document.getElementsByTagName("select")[b];
  		for (i = 0; i < opt.length; i++) { 
    		var option = document.createElement("option");
    		option.text = opt[i];
    		option.value=i+1;
    		select.options.add(option);
 		}  
}
function ponerDatosSelectMultipleHtml(optm,b){
	
  		var select = document.getElementsByTagName("select")[b+2];
  		for (i = 0; i < optm.length; i++) { 
    		var option = document.createElement("option");
    		option.text = optm[i];
    		option.value=i+1;
    		select.options.add(option);
 		}  
}
function ponerDatosCheckboxHtml(opt,b){
 	var checkboxContainer=document.getElementsByTagName('fieldset')[b+6];
 	for (i = 0; i < opt.length; i++) { 
   	 	var input = document.createElement("input");
   	 	var label = document.createElement("label");
    	label.innerHTML=opt[i];
   	 	label.setAttribute("for", "parte_"+i);
   	 	input.type="checkbox";
    	input.name="parte";
   	 	input.id="parte_"+i;;    
   		checkboxContainer.appendChild(input);
   	 	checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	}
  	 	checkboxContainer.appendChild(document.createElement("hr")); 
}
function ponerDatosRadioHtml(opt,b){
 	var radioContainer=document.getElementsByTagName('fieldset')[b+8];
 	for (i = 0; i < opt.length; i++) { 
   	 	var input = document.createElement("input");
   	 	var label = document.createElement("label");
    	label.innerHTML=opt[i];
   	 	label.setAttribute("for", "respuesta_"+i);
   	 	input.type="radio";
    	input.name="respuesta";
   	 	input.id="respuesta_"+i;;    
   		radioContainer.appendChild(input);
   	 	radioContainer.appendChild(label);
  	 	radioContainer.appendChild(document.createElement("br")); 
	}
	if (b==0)
  	 	radioContainer.appendChild(document.createElement("hr")); 
  	 else{
  	 	radioContainer.appendChild(document.createElement("br")); 
  		radioContainer.appendChild(document.createElement("br"));
  	}
}

function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.parte.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.parte[i].checked) checked=true;
   }
   if (f.elements[0].value==""|| f.elements[1].value=="") {
    f.elements[0].focus();
    alert("Escribe algo");
    return false;
   } else if (f.elements[2].selectedIndex==0||f.elements[3].value==0) {
    f.elements[2].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}