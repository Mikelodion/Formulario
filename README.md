# Formulario: HTML, CSS , JavaScript & XML

**Autor: Miquel Janer Mudoy**

[Link RawGit de la página de Inicio](https://rawgit.com/Mikelodion/Formulario/master/Inici.html)

[Link RawGit del formulari](https://rawgit.com/Mikelodion/Formulario/master/Formulari.html)

[Link RawGit del XML](https://rawgit.com/Mikelodion/Formulario/master/xml/xml.xml)

**Este repositorio contiene una (branch) con el código minificado.**

### Documentación

**HTML**

La estrucura del html es la siguiente:
  
   __Página de Inicio__
   
        -Un div que forma parte de la cabecera de la página, en el qual podemos encontrar el logo de esta. También hay otro div en el que vemos una lista ordenada que junto al css y js funcionarà de menú.
        
        -Dos div, en el primero habrá la información de la página, en el segundo las intrucciones del formulario junto a un "botón" para iniciar el test, y alternaremos de un div a otro mediante la propiedad css (display) y unas lineas de codigo js.
        
   __Formulario__
   
        -Este tiene un div fijo que contiene el logo de la página, el cual si lo pulsas te saldrá un mensaje de aviso de que te estas saliendo del test para ir a la página de inicio. Dentro de este también encontramos el div que cuando le demos a corregir va a aparecer junto a la nota.
        
        -El contenedor "myform" que contiene un contenedor para cada pregunta y sus respuestas.

**CSS**

Para facilitar la comprensión de este, he dividido los estilos de ambas páginas, por lo que tenemos 2 documentos css (uno para movil y otro para pc) para la página de inicio y otros 2 para la página del formulario. Los archivos css que tienen la letra "i" en el inicio del nombre son los correspondientes a la página de inicio.

**XML:**
 
 Este formulario está hecho a partir de un XML donde se encuentran las preguntas y las respuestas que luego leeremos con javascript. Este XML simplemente contiene las siguientes etiquetas:
 
 -Questions: Contiene las diez preguntas de nuestro examen.
 
 -Question: Contiene cada una de las preguntas del examen. Las siguientes etiquetas se encuentran dentro de question.
 
 -Type: Contiene el tipo de pregunta
 -Title: Título de la pregunta.
 -Option: Contiene una opción de respuesta de la pregunta.
 -Answer: Contiene las respuestas de una pregunta.

**JavaScript**
 Este javascript está compuesto principalmente por dos partes. Una parte que se encarga de gestionar el XML al cargar la página y otra parte que se encarga de reaccionar al pulsar el botón de submit:
 
 -**Gestionar XML:** Esta parte se encarga de cargar la web con toda la información que se encuentra en el xml. A la vez que cargamos los títulos, añadiremos todas las respuestas en una array bidimensional para asi a la hora de corregir tener las respuestas correctas a mano.
 
 __Onclick:__
 
      Cuando pulsemos el botón de enviar:
 
      -Aqui he añadido la funcionalidad de no dejarte corregir si ya lo has echo. Si no, primeramente va a inicializar la variable "nota" a 0, **comprobar**emos que se han respondido todas las preguntas para que el test se haga sobre todas las preguntas, despues **corregir**emos cada tipo de pregunta (text,select,multiple,check,radio) con una función "corregir" para cada tipo y finalmente **presentar**emos la nota dependiendo del numero de errores y aciertos. 
 
 ## NO CORRIGE CHECKBOX NI SELECT MULTIPLE
 
 
