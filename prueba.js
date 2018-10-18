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
const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = `SELECT ?Agaricales ?AgaricalesLabel ?comestibilidad ?comestibilidadLabel ?imagen WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.
  ?Agaricales wdt:P789 ?comestibilidad.
  ?Agaricales wdt:P18 ?imagen.
}
LIMIT 5
`,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
    const { head: { vars }, results } = json;
    console.log(results.bindings);
    var n_results = 0;
    
    var html = "";
    for ( const result of results.bindings ) {

    	html += 
    	'<article>' +
    	'<p>' + result.AgaricalesLabel.value + '</p>' +
    	'<img src=' + JSON.stringify(result.imagen.value) + ' width="50" alt="asdf"></img>' +
    	'</article>'

    }

    document.getElementById("resultados").innerHTML = html;

} );

}