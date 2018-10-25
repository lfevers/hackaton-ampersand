
var stack = [];

function split(texto){
  // HACE SPLIT EN LA RUTA Y COGE LA ULTIMA PALABRA SEPARADA POR EL CARACTER / --> Q12345
  var pieces = texto.split(/[/]+/);
  var result = pieces[pieces.length-1];
  return result;
}

function listar(Q) {
	stack.push(Q); //introduce en la stack la actual
	//Q--> Q123456 es a partir de la que buscas
	console.log(Q)

	var consulta = `SELECT DISTINCT ?Agaricales ?AgaricalesLabel WHERE {
	  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
	  ?Agaricales wdt:P171 wd:`+Q+ `.
	  ?_Agaricales wdt:P171* ?Agaricales.
	  ?_Agaricales wdt:P789 ?comestibilidad.
	  
	}ORDER BY ?AgaricalesLabel`;

	//DESDE AQUI HASTA ....
	const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = consulta ,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

	fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
	    const { head: { vars }, results } = json;
	    
	    //console.log("resultados: " + results); //MUESTRO TODOS LOS RESULTADOS DE LA CONSULTA, ES UN VECTOR
	    //RESULT BINDINGS ES EL VECTOR CON TODOS LOS RESULTADOS
	    if(results.bindings.length !=0){
	        var n_results = 0;
	        var html = "";
	        //DENTRO DE EL VECTOR RESULT.BINDINGS CADA RESULTADO ES EL RESULT JUSTO AKI ABAJO SE HACE ESO
	        for ( const result of results.bindings ) {
	          var Q=result.Agaricales.value;
	          //console.log("EL NOMBRE: " + result.AgaricalesLabel.value);
	          //name = result.AgaricalesLabel.value;
	          Q = split(Q);
	          console.log(Q);

	          html +=  //ESTAS LINEAS SON LAS QUE TENEIS QUE MODIFICAR RECORDAD QUE SE VAN SUMANDO AL ESTAR EN UN BUCLE
	          `
	          <div class="seta-class" onclick="listar('`+Q+`');">
	              
	              <div class="texto">
	                <p class="name-subclass">`+result.AgaricalesLabel.value+ `</p>
	              </div>
	            </div>
	            
	          `
	        }

	        document.getElementById("resultados").innerHTML = html;
	        }else{
	        	//No tiene hijos, por lo que es la ultima de su rama--> es una seta--> pagina de informacion de seta
	         	window.location.href= "identificar.html?Q="+stack[stack.length-1];
	        }  

	} );
}

function atras(){
	//Metodo que elimina busca la anterior consulta a la actual
	Q = stack.pop(); //Devuelve la actual. En caso de ser la pagina principal deja la stack a 0--> no volver a listar
	
	if(stack.length != 0){
		//Se puede tirar atras
		Q = stack.pop(); //Devuelve la anterior consulta respecto a la que te encuentras
		listar(Q); //Carga los subtipos de la anterior a la actual
	}else{
		stack.push(Q); //Si es la pagina principal para no dejar la pila vacia vuelve a introducir la actual
	}
}

