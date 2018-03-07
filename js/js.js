
var url = "https://rawgit.com/Mikelodion/Formulario/master/xml/xml.xml";
var formElement=null;
var respuestas=[];
var nRespuestas=[];
var nota=0;
var examenRealizado=false;


window.onload = function(){ 
 	//LEER XML de xml/preguntas.xml
 	var xhttp = new XMLHttpRequest();
 	xhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
   			gestionarXml(this);
  		}
 	};
 xhttp.open("GET",url, true);
 xhttp.send();
 //CORREGIR al apretar el botón
 formElement=document.getElementById('contenedor');
 	formElement.onsubmit=function(){
 		if (!examenRealizado) {
	  	 inicializar();
	  	 	if (comprobar()){
	   			if (confirm("¿Quieres corregir el examen?")) {
		    		corregirText();
		   			corregirSelect();
		   			corregirRadio();
		    		//corregirCheckbox();
		    		presentarNota();
		    		examenRealizado=true;
				}
	   		}
		}else{
			alert("Ya has corregido el examen")
		}	
   		return false;
 	}
 	document.getElementById("logo").onclick = function () {
		if(confirm("¿Seguro que desea salir del examen?")){
			window.open("Inici.html","_self");
		}
	}
}
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
	//Poner Titulos y Respuestas
	for (var i = 0; i <10; i++) {
	 	var tituloInput=xmlDoc.getElementsByTagName("title")[i].innerHTML;
 		ponerDatosInputHtml(tituloInput, i);

 		nRespuestas[i]=xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer").length;
		respuestas[i]=[];
		for(b=0; b<nRespuestas[i]; b++){

			respuestas[i][b] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[b].innerHTML;
		}
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
 	//Radio
	for(b=0;b<2;b++){
 		var opcionesRadio = [];
 		var noptradio = xmlDoc.getElementById("radio"+b).getElementsByTagName('option').length;
		for (i = 0; i < noptradio; i++) { 
  	  		opcionesRadio[i]=xmlDoc.getElementById("radio"+b).getElementsByTagName('option')[i].innerHTML;
 		}  
 		ponerDatosRadioHtml(opcionesRadio, b);
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
    		option.value=i;
    		select.options.add(option);
 		}  
}
function ponerDatosSelectMultipleHtml(optm,b){
	
  		var select = document.getElementsByTagName("select")[b+2];
  		for (i = 0; i < optm.length; i++) { 
    		var option = document.createElement("option");
    		option.text = optm[i];
    		option.value=i;
    		select.options.add(option);
 		}  
}
function ponerDatosCheckboxHtml(opt,b){
 	var checkboxContainer=document.getElementsByTagName('fieldset')[b+6];
 	for (i = 0; i < opt.length; i++) { 
   	 	var input = document.createElement("input");
   	 	var label = document.createElement("label");
   	 	if (b==0) {
    	label.innerHTML=opt[i];
   	 	label.setAttribute("for", "parte_"+i);
   	 	input.type="checkbox";
    	input.name="parte";
   	 	input.id="parte_"+i;;    
   		checkboxContainer.appendChild(input);
   	 	checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
		}
		if(b==1){
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
  	 	checkboxContainer.appendChild(document.createElement("hr")); 
}
function ponerDatosRadioHtml(opt,b){
	var pregunta="nueve";
	if (b==1){
		pregunta="diez";
	}

 	var radioContainer=document.getElementsByTagName('fieldset')[b+8];
 	for (i = 0; i < opt.length; i++) { 
   	 	var input = document.createElement("input");
   	 	var label = document.createElement("label");
    	label.innerHTML=opt[i];
   	 	label.setAttribute("for", pregunta+i+b);
   	 	input.type="radio";
    	input.name=pregunta;
   	 	input.id=pregunta+i+b;; 
   	 	input.value=i;   
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
function inicializar(){
   //document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

function comprobar(){
   var f=formElement;
   var checked;
   var name;
   
   
   //Comprobar texts
    for(i = 1; i < 4; i++){
	   if (f.elements[i].value=="") {
			f.elements[i].focus();
			alert("Escribe una respuesta.");
			return false;
	   }
	}
	
	//Comprobar selects
	for(i=1;i<4;i++){
		if(f.elements[i+4].selectedIndex==0) {
			f.elements[i+4].focus();
			alert("Selecciona una opción");
			return false;
		}
	} 
	
	//Comprobar selects-multiple
	for(i=1;i<4;i++){
		if(f.elements[i+8].selectedIndex==-1) {
			f.elements[i+8].focus();
			alert("Selecciona almenos una opción");
			return false;
		}
	} 
	
	/*//Comporbar checkbox
	for(i=0; i<8; i++){
		checked0=false;
		checked1=false;
		
		if(i<4){
			if (f.p.checked) checked0=true;
		}
		else{
			if(f.p.checked) checked1=true;
		}

	
			if (!checked) {
				f.parte[0].focus();
				alert("Selecciona almenos una opción");
				return false;

			}
			if (!checked1) {
				f.parte[4].focus();
				alert("Selecciona almenos una opción");
				return false;
			}
	}*/
	//Comprobar radios
	for(i=0;i<2;i++){
		name=f.nueve;
        if (i==1){
            name=f.diez;
        }
        if (name.value=="") {
            name[0].focus();
            alert("Seleciona una opción");
            return false;
        }   
    }
	return true;	//Todas las preguntas contestadas
}
function corregirText(){

	var f=formElement;
	for(numeroQuestion=0; numeroQuestion<2; numeroQuestion++){
		
		if(respuestas[numeroQuestion][0]==f.elements[1+numeroQuestion*2].value){
			nota+=1;
		}
	}
}
function corregirSelect(){

	for(numeroQuestion=2; numeroQuestion<4; numeroQuestion++){
		
		if(respuestas[numeroQuestion][0]==document.getElementsByTagName("select")[numeroQuestion-2].value){
			nota+=1;
		}else{
			nota-=1.0
		}
	}
}
function corregirMultiple(){
	for(numeroQuestion=4;numeroQuestion<6;numeroQuestion++){
        var sel = formElement.elements[1+numeroQuestion*2];
        var escorrecta=[];

        for(i=1;i<(sel.length);i++){		// recorr per tantes opcions que hi ha, saltant la primera que es la defecte
            var opt=sel.options[i];			// obte la opció i

            if(opt.selected){//si la opció i està selecionada
            	escorrecta[i]=false;
            	for(j=0; j<nRespuestas[numeroQuestion]; j++){
            			//guardamos si es correcta o no
            		if(i-1==respuestas[numeroQuestion][j]) escorrecta[i]=true;
            	}
            	//poner nota por correcta o no


            }
        }
	}
}
function corregirRadio(){
	var f=formElement;
	var radio;
	for (numeroQuestion=8; numeroQuestion<10; numeroQuestion++) {
		if(numeroQuestion==8){
			radio=f.nueve;
		}else{
			radio=f.diez;
		}
		if(radio.value==respuestas[numeroQuestion][0]){
			nota+=1.0;
		}else{
			nota-=1.0/radio.length;
		}
	}
}
function presentarNota(){
	var p = document.createElement("h5");
	if(nota<0) nota=0;
    	var node = document.createTextNode("Tu nota es: " + nota.toFixed(2));
    	p.appendChild(node);
    	document.getElementById("nota").appendChild(p);
    	document.getElementById("resultado").style.display="block";
    	window.location.hash = '#nota';
}
