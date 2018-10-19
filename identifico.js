
function split(texto){
  // HACE SPLIT EN LA RUTA Y COGE LA ULTIMA PALABRA SEPARADA POR EL CARACTER / --> Q12345
  var pieces = texto.split(/[/]+/);
  var result = pieces[pieces.length-1];
  return result;
}
function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function identificar() {
	// body...
	console.log("HOLA");

	var seta = "Q188643"
	var seta = getParameterByName("Q");
	var nombre = getParameterByName("name");

	console.log("SETAAAAAAA:"+seta);

	var consulta = `SELECT  ?comestibilidadLabel ?imagen ?spore_print_color ?spore_print_colorLabel ?mushroom_cap_shape ?mushroom_cap_shapeLabel ?car_cter_del_estipe ?car_cter_del_estipeLabel ?accesorios_del_himenio ?accesorios_del_himenioLabel ?tipo_de_himenio ?tipo_de_himenioLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  wd:Q222449 wdt:P789 ?comestibilidad.
          OPTIONAL{ wd:` + seta + ` wdt:P18 ?imagen.}
          OPTIONAL{ wd:` + seta + ` wdt:P787 ?spore_print_color.}
          OPTIONAL{ wd:` + seta + ` wdt:P784 ?mushroom_cap_shape.}
          OPTIONAL{ wd:` + seta + ` wdt:P786 ?car_cter_del_estipe.}
          OPTIONAL{ wd:` + seta + ` wdt:P785 ?accesorios_del_himenio.}
          OPTIONAL{ wd:` + seta + ` wdt:P783 ?tipo_de_himenio.} 
}
`;
console.log("CONSULTA");
console.log(consulta);

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


        	comestibilidad ="no.png";
			if( result.comestibilidadLabel != undefined){
			switch(result.comestibilidadLabel.value) {
			    case "edible mushroom":
			        comestibilidad= "Q654236.png";
			        break;
			    case "inedible mushroom":
			        comestibilidad= "Q4317894.png";
			        break;
			    case "caution mushroom":
			    console.log("HOLACONVEX MUS");
			        comestibilidad="Q19888537.png";
			        console.log(cap);
			        break;
			    case "psychoactive mushroomp":
			        comestibilidad= "Q1169875.png";
			        break;
			    case "poisonous mushroom":
			        comestibilidad= "Q19888562.png";
			        break;
			    case "allergenic mushroom":
			        comestibilidad= "Q19888579.png";
			        break;
			    case "deadly mushroom":
			        comestibilidad= "Q19888591.png";
			        break;	
			    default:
			        comestibilidad= "Q19888591.png";
			        break;  
				}
			}	

			cap ="no.png";
			if( result.mushroom_cap_shapeLabel != undefined){
			switch(result.mushroom_cap_shapeLabel.value) {
			    case "campanulate mushroom cap":
			        cap= "Q19887953.png";
			        break;
			    case "conical mushroom cap":
			        cap= "Q19887954.png";
			        break;
			    case "convex mushroom cap":
			    console.log("HOLACONVEX MUS");
			        cap="Q14544535.png";
			        console.log(cap);
			        break;
			    case "depressed mushroom cap":
			        cap= "Q19887955.png";
			        break;
			    case "flat mushroom cap":
			        cap= "Q19887957.png";
			        break;
			    case "infundibuliform mushroom cap":
			        cap= "Q19887958.png";
			        break;
			    case "offset mushroom cap":
			        cap= "Q14544541.png";
			        break;
			    case "ovate mushroom cap":
			        cap= "Q19887961.png";
			        break;
			    case "umbilicate mushroom cap":
			        cap= "Q19887962.png";
			        break;
			    case "umbonate mushroom cap":
			        cap= "Q19887964.png";
			        break;
			    case "no mushroom cap":
			        cap= "Q19887965.png";
			        break;
			    case "concave to plane":
			        cap= "Q23058598.png";
			        break;			
			    default:
			        cap= "Q23058598.png";
			        break;  
				}
			}	

			tipo_h ="no.png";
			if( result.tipo_de_himenioLabel != undefined){
			switch(result.tipo_de_himenioLabel.value) {
			    case "lamella":
			        tipo_h= "Q269345.png";
			        break;
			    case "pores":
			        tipo_h= "Q19861549.png";
			        break;
			    case "smooth":
			        tipo_h= "Q19861550.png";
			        break;
			    case "ridges":
			        tipo_h= "Q19861551.png";
			        break;
			    case "teeth":
			        tipo_h= "Q19861552.png";
			        break;
			    case "gleba":
			        tipo_h= "Q2034230.png";
			        break;
			    default:
			        tipo_h= "Q2034230.png";
			        break;  
				}
			}

			console.log("ESTOOO: " + result.accesorios_del_himenioLabel);
			accesorio_himen ="no.png";
			if( result.accesorios_del_himenioLabel != undefined){
				console.log("NO undefinido");
				switch(result.accesorios_del_himenioLabel.value) {
			    case "adnate hymenium attachment":
			        accesorio_himen= "Q14544569.png";
			        break;
			    case "adnexed hymenium attachment":
			        accesorio_himen= "Q19887923.png";
			        break;
			    case "decurrent hymenium attachment":
			        accesorio_himen= "Q19887925.png";
			        break;
			    case "emarginate hymenium attachment":
			        accesorio_himen= "Q19887926.png";
			        break;
			    case "free hymenium attachment":
			        accesorio_himen= "Q14544563.png";
			        break;
			    case "seceding hymenium attachment":
			        accesorio_himen= "Q19887929.png";
			        break;
			    case "sinuate hymenium attachment":
			        accesorio_himen= "Q19887930.png";
			        break;
			    case "subdecurrent hymenium attachment":
			        accesorio_himen= "Q19887931.png";
			        break;
			    case "no hymenium attachment":
			        accesorio_himen= "Q19887932.png";
			        break;
			    default:
			        accesorio_himen= "Q19887932.png";
			        break;  
				}
			}			

			caracter ="no.png";
			if( result.accesorios_del_himenioLabel != undefined){
				switch(result.accesorios_del_himenioLabel.value) {
			    case "bare stipe":
			        caracter= "Q14544581.png";
			        break;
			    case "ring stipe":
			        caracter= "Q14544582.png";
			        break;
			    case "volva stipe":
			        caracter= "Q19887985.png";
			        break;
			    case "ring and volva stipe":
			        caracter= "Q19887987.png";
			        break;
			    case "cortina stipe":
			        caracter= "Q19887988.png";
			        break;
			    default:
			        caracter= "Q19887988.png";
			        break;  
			}

			}

			color_e ="no.png";
			if( result.spore_print_colorLabel != undefined){
				switch(result.spore_print_colorLabel.value) {
			    case "black":
			        color_e= "Q23445.png";
			        break;
			    case "brown":
			        color_e= "Q47071.png";
			        break;
			    case "cream ":
			        color_e= "Q2730433.png";
			        break;
			    case "green":
			        color_e= "Q3133.png";
			        break;
			    case "ochre":
			        color_e= "Q194191.png";
			        break;
			    case "olive":
			        color_e= "Q864152.png";
			        break;
			    case "pink":
			        color_e= "Q429220.png";
			        break;
			    case "purple":
			        color_e= "Q3257809.png";
			        break;
			    case "salmon":
			        color_e= "Q2015138.png";
			        break;
			    case "tan":
			        color_e= "Q1670336.png";
			        break;
			    case "white":
			        color_e= "Q23444.png";
			        break;
			    case "yellow":
			        color_e= "Q943.png";
			        break;
			    default:
			        color_e= "Q23444.png";
			        break;  
			}
			}

			

/*
          var Q=result.accesorios_del_himenioLabel.value;

          console.log(Q);
          var objetoQ = split(Q);
          console.log(objetoQ);
*/
          //MOSTRAR LOS RESULTADOS CON NOMBRE, FOTO Y COMESTIBILIDAD
          html +=  //ESTAS LINEAS SON LAS QUE TENEIS QUE MODIFICAR RECORDAD QUE SE VAN SUMANDO AL ESTAR EN UN BUCLE
           //TODO ESTO LUEGO VA DENTRO DEL DIV DE RESULTADOS         
          `
                <div class="centrar">
					<p class="nombre">`+nombre+`</p>
				</div>
				<div class="centrar">
					<img src="`+result.imagen.value+ `" class="img-class image5">
				</div>

				<div class="tarjetas-juntas">
					<div class="tarjeta">
						<div class="imagen3">
							<h3>Comestibilidad</h3>
						</div>
						<div>
							<img src="img/`+comestibilidad+ `" class="imagen4">
						</div>	
					</div>

					<div class="tarjeta">
						<div class="imagen3">
							<h3>Forma del sombrero</h3>
						</div>
						<div>
							<img src="img/`+cap+`" class="imagen4">
						</div>	
					</div>

					<div class="tarjeta">
						<div class="imagen3">
							<h3>Tipo de himenio</h3>
						</div>
						<div>
							<img src="img/`+tipo_h+`" class="imagen4">
						</div>	
					</div>

					<div class="tarjeta">
						<div class="imagen3">
							<h3>Accesorios del himenio</h3>
						</div>
						<div>
							<img src="img/`+accesorio_himen+`" class="imagen4">
						</div>	
					</div>	

					<div class="tarjeta">
						<div class="imagen3">
							<h3>Carácter del estipe</h3>
						</div>
						<div>
							<img src="img/`+caracter+`" class="imagen4">
						</div>	
					</div>	

					<div class="tarjeta">
						<div class="imagen3">
							<h3>Color de esporas</h3>
						</div>
						<div>
							<img src="img/`+color_e+`" class="imagen4">
						</div>	
					</div>				
				</div>	
            
          `


        }

        document.getElementById("resultados").innerHTML = html;
        }else{
          console.log("ULTIMA" + n); // EN N ESTA ALMACENADA LA Q DE LA SETA QUE HAY QUE MOSTRAR
          //window.location.href= "identificar.html&"+n;
        }
    

} );
}

