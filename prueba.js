function informativa(){

	const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = `SELECT ?Agaricales ?AgaricalesLabel ?comestibilidad ?comestibilidadLabel ?imagen WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.
  ?Agaricales wdt:P789 ?comestibilidad.
  ?Agaricales wdt:P18 ?imagen.
  
}
LIMIT 5`,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
    const { head: { vars }, results } = json;
    console.log(results.bindings);

    var result = results.bindings[0].Agaricales.value;
    console.log(result);

    var numero = 0;
    for ( const resultado of results.bindings){
    	console.log(resultado);
    }
    /*for ( const result of results.bindings ) {
    	console.log(result);
        for ( const variable of vars ) {

        	console.log( '- ' + '%s: %o', variable, result[variable] );

    		var imagen = '<img src=' + JSON.stringify(result[variable].value) + ' alt="asdf"></img>';
    		document.getElementById("imagen").innerHTML = imagen;
    		

    		console.log("ELEMENTO IMAGEN: " +imagen);
    		
    		console.log("ENLACE: "+JSON.stringify(result[variable].value));
            
        }
        console.log( '---' );
    }
    */
} );



}


function prueba(){

	var color = document.getElementById("color").value;
  var shape= document.querySelector('input[name="shape"]:checked').value;

  console.log("FORMA: " + shape);


	var consulta = `SELECT ?AgaricalesLabel ?comestibilidadLabel ?imagen ?spore_print_colorLabel ?mushroom_cap_shapeLabel ?car_cter_del_estipeLabel ?accesorios_del_himenioLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.
  ?Agaricales wdt:P789 ?comestibilidad.
  ?Agaricales wdt:P18 ?imagen.

  ?Agaricales wdt:P787 ?spore_print_color.
  ?Agaricales wdt:P787 wd:` + color + `.
  
  ?Agaricales wdt:P784 ?mushroom_cap_shape.
  ?Agaricales wdt:P784 wd:` + shape + `.
 
  OPTIONAL { ?Agaricales wdt:P789 ?comestibilidad. }
}
`;


const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = consulta ,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
    const { head: { vars }, results } = json;
    console.log(results.bindings);
    var n_results = 0;
    
    var html = "";
    for ( const result of results.bindings ) {
    	//MOSTRAR LOS RESULTADOS CON NOMBRE, FOTO Y COMESTIBILIDAD
    	html += 
    	'<article>' +
    	'<h3>' + result.AgaricalesLabel.value + '</h3>' +
    	'<img src=' + JSON.stringify(result.imagen.value) + ' width="50" alt="asdf"></img>' +
    	'<p> Comestibilidad: ' + JSON.stringify(result.comestibilidadLabel.value)  + '</p>' + 
    	'</article>'

    }

    document.getElementById("resultados").innerHTML = html;

} );

}