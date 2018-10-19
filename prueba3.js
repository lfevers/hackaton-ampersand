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

function split(texto){
  // HACE SPLIT EN LA RUTA Y COGE LA ULTIMA PALABRA SEPARADA POR EL CARACTER / --> Q12345
  var pieces = texto.split(/[/]+/);
  var result = pieces[pieces.length-1];
  return result;
}

function prueba(n){

  console.log(n);
  // AQUI ESTA LA CONSULTA, AQUI TENEIS QUE ESCOGER LOS PARAMENTROS QUE QUEREIS RECIBIR
  //ESO LO MIRAIS CON CLAUDIA
	var consulta = `SELECT  ?comestibilidadLabel ?imagen ?spore_print_color ?spore_print_colorLabel ?mushroom_cap_shape ?mushroom_cap_shapeLabel ?car_cter_del_estipe ?car_cter_del_estipeLabel ?accesorios_del_himenio ?accesorios_del_himenioLabel ?tipo_de_himenio ?tipo_de_himenioLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  wd:Q188643 wdt:P789 ?comestibilidad.
  OPTIONAL{ 
          wd:Q188643 wdt:P18 ?imagen.
           wd:Q188643 wdt:P787 ?spore_print_color.
           wd:Q188643 wdt:P784 ?mushroom_cap_shape.
           wd:Q188643 wdt:P786 ?car_cter_del_estipe.
           wd:Q188643 wdt:P785 ?accesorios_del_himenio.
           wd:Q188643 wdt:P783 ?tipo_de_himenio.
          } 
}
`;

//DESDE AQUI HASTA ....
const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = consulta ,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
    const { head: { vars }, results } = json;

    //...AQUI NO SE TOCA
    console.log(results.bindings); //MUESTRO TODOS LOS RESULTADOS DE LA CONSULTA, ES UN VECTOR
    //RESULT BINDINGS ES EL VECTOR CON TODOS LOS RESULTADOS
    if(results.bindings.length !=0){    

        var n_results = 0;
        var html = "";
        //DENTRO DE EL VECTOR RESULT.BINDINGS CADA RESULTADO ES EL RESULT JUSTO AKI ABAJO SE HACE ESO
        for ( const result of results.bindings ) {

          console.log("VALOR");
          console.log(result.accesorios_del_himenioLabel.value);


          console.log("HOLA:");
          console.log(result.accesorios_del_himenioLabel.value);
          console.log(result.accesorios_del_himenioLabel.value);
          var Q=result.accesorios_del_himenioLabel.value;

          console.log(Q);
          var objetoQ = split(Q);
          console.log(objetoQ);

          //MOSTRAR LOS RESULTADOS CON NOMBRE, FOTO Y COMESTIBILIDAD
          html +=  //ESTAS LINEAS SON LAS QUE TENEIS QUE MODIFICAR RECORDAD QUE SE VAN SUMANDO AL ESTAR EN UN BUCLE
           //TODO ESTO LUEGO VA DENTRO DEL DIV DE RESULTADOS         
          `
              <p>HOLA</p>
                <p>`+result.accesorios_del_himenioLabel.value+ `</p>
            
          `



        }

        document.getElementById("resultados").innerHTML = html;
        }else{
          console.log("ULTIMA" + n); // EN N ESTA ALMACENADA LA Q DE LA SETA QUE HAY QUE MOSTRAR
          //window.location.href= "identificar.html&"+n;
        }
    

} );

}