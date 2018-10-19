function busqueda(){


    //FORMULARIO
    // - COLOR
      var color = document.getElementById("color").value; //COJO EL COLOR DEL SELECTOR
  
    if (color != '') { // SI NO HE ESCOGIDO COLOR NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
      color =           // Y LO AÑADO LUEGO A CONSULTA
        `?Agaricales wdt:P787 ?spore_print_color.
        ?Agaricales wdt:P787 wd:` + color + `.` ;
    }
  
  
    // - FORMA
    var shape= document.querySelector('input[name="shape"]:checked').value;
  
    if (shape != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
      shape =               // Y LO AÑADO LUEGO A CONSULTA
        `?Agaricales wdt:P784 ?mushroom_cap_shape.
        ?Agaricales wdt:P784 wd:` + shape + `.`;
    }
  
    // - ESTIRPE
  
    var estirpe= document.querySelector('input[name="estirpe"]:checked').value;
  
    if (estirpe != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
      estirpe =               // Y LO AÑADO LUEGO A CONSULTA
        `?Agaricales wdt:P786 ?car_cter_del_estipe.
        ?Agaricales wdt:P786 wd:` + estirpe + `.`;
    }
  
  
  
    // - ACCESORIO HIMENIO
  
    var himenio= document.querySelector('input[name="himenio"]:checked').value;
  
  
    if (himenio != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
      himenio =               // Y LO AÑADO LUEGO A CONSULTA
        `?Agaricales wdt:P785 ?accesorios_del_himenio.
        ?Agaricales wdt:P785 wd:` + himenio + `.`;
    }
  
     // - TIPO HIMENIO
  
    var t_himenio= document.querySelector('input[name="t-himenio"]:checked').value;

  
    if (t_himenio != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
      t_himenio =               // Y LO AÑADO LUEGO A CONSULTA
        `?Agaricales wdt:P783 ?tipo_de_himenio.
        ?Agaricales wdt:P783 wd:` + t_himenio + `.`;
    }
  
    // AQUI ESTA LA CONSULTA, AQUI TENEIS QUE ESCOGER LOS PARAMENTROS QUE QUEREIS RECIBIR
    //ESO LO MIRAIS CON CLAUDIA
      var consulta = `SELECT ?AgaricalesLabel ?comestibilidadLabel ?imagen ?spore_print_colorLabel ?mushroom_cap_shapeLabel ?car_cter_del_estipeLabel ?accesorios_del_himenioLabel WHERE {
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    ?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.
  
    ?Agaricales wdt:P789 ?comestibilidad.
    ?Agaricales wdt:P18 ?imagen.
  
    `+ color + `  
    `+ shape + `
    `+ estirpe + ` 
    `+ himenio + `
    `+ t_himenio + `
   
    OPTIONAL { ?Agaricales wdt:P789 ?comestibilidad. }
  
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
      //MUESTRO TODOS LOS RESULTADOS DE LA CONSULTA, ES UN VECTOR
      //RESULT BINDINGS ES EL VECTOR CON TODOS LOS RESULTADOS
      var n_results = 0;
      
      var html = "";
      //DENTRO DE EL VECTOR RESULT.BINDINGS CADA RESULTADO ES EL RESULT JUSTO AKI ABAJO SE HACE ESO
      for ( const result of results.bindings ) {
          //MOSTRAR LOS RESULTADOS CON NOMBRE, FOTO Y COMESTIBILIDAD
          html +=  //ESTAS LINEAS SON LAS QUE TENEIS QUE MODIFICAR RECORDAD QUE SE VAN SUMANDO AL ESTAR EN UN BUCLE
          '<article>' + //TODO ESTO LUEGO VA DENTRO DEL DIV DE RESULTADOS
          '<h3>' + result.AgaricalesLabel.value + '</h3>' + 
          '<img src=' + JSON.stringify(result.imagen.value) + ' width="50" alt="asdf"></img>' +
          '<p> Comestibilidad: ' + JSON.stringify(result.comestibilidadLabel.value)  + '</p>' + 
          '</article>'
  
      }
  
      document.getElementById("resultados").innerHTML = html;
  
  } );
  
  }

  function seleccionado(label){
    console.log(label);
  }