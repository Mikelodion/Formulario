
var url = "https:rawgit.com/Mikelodion/Formulario/master/xml.xml";

window.onload = function(){ 

 //CORREGIR al apretar el botón

 
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
 	var opcionesSelect = [];
 	for (var b = 0; b<2; b++){
 		var nopt = xmlDoc.getElementById("select"+b).getElementsByTagName('option').length;
  		for (i = 0; i < nopt; i++) { 
   	 		opcionesSelect[i] = xmlDoc.getElementById("select"+b).getElementsByTagName('option')[i].innerHTML;
 		}
 		ponerDatosSelectHtml(opcionesSelect,b);
 	}
 	//Select Multiple
 	var opcionesSelectmultiple = [];
 	for(var b = 0; b<2; b++){
 		var noptm = xmlDoc.getElementById("multiple"+b).getElementsByTagName("option").length;
 		for(i=0; i<noptm; i++){
 			opcionesSelectmultiple[i] = xmlDoc.getElementById("multiple"+b).getElementsByTagName("option")[i].innerHTML;

 		}
 		ponerDatosSelectMultipleHtml(opcionesSelectmultiple,b);

 	}
 	//CHECKBOX
	var opcionesCheckbox = [];
	for(b=0;b<2;b++){
 		var noptcheck = xmlDoc.getElementById("check"+b).getElementsByTagName('option').length;
		for (i = 0; i < noptcheck; i++) { 
  	  		opcionesCheckbox[i]=xmlDoc.getElementById("check"+b).getElementsByTagName('option')[i].innerHTML;
 		}  
 		ponerDatosCheckboxHtml(opcionesCheckbox, b);
	}
 	for(b=0;b<2;b++){
 	var nres = xmlDoc.getElementById("check"+b).getElementsByTagName('answer').length;
 	}
 	for (i = 0; i < nres; i++) { 
  		respuestasCheckbox[i]=xmlDoc.getElementById("profe_003").getElementsByTagName("answer")[i].innerHTML;
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
}

