function prueba(){

	const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = `SELECT ?Agaricales ?AgaricalesLabel ?comestibilidad ?comestibilidadLabel ?imagen WHERE {
  		SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
 		?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.
  		?Agaricales wdt:P789 ?comestibilidad.
 		?Agaricales wdt:P18 ?imagen.
		}`,
	      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
	      headers = { 'Accept': 'application/sparql-results+json' };

	fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
	    const { head: { vars }, results } = json;
	    for ( const result of results.bindings ) {
	    	console.log(result);
	    	num = 0;
	        for ( const variable of vars ) {
	        	num++;
	        	console.log(num);
	            //console.log( '%s: %o', variable, result[variable] );
	        }
	        console.log( '---' );
	    }
	} );


}