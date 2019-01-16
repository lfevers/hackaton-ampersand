import { Component, OnInit } from '@angular/core';
import { WikidataService } from '../../services/wikidata.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-identificar',
  templateUrl: './identificar.component.html',
  styleUrls: ['./identificar.component.css']
})
export class IdentificarComponent implements OnInit {

  form_busqueda:FormGroup;

  constructor( public _wikidataService:WikidataService) {
    this.form_busqueda = new FormGroup({
    'color':  new FormControl             ('',  ),//this.dniDuplicado.bind(this)
    'shape': new FormControl        ('',  ),
    'estipe': new FormControl           ('',  ),
    'himenio': new FormControl        ('',  ),
    't_himenio': new FormControl        ('',  ),
    });
  }

  ngOnInit() {
  }

  busqueda_avanzada(){ // CONSULTA Y RESPUESTA A LA BUSQUEDA DESDE FORMULARIO (COLORES, FORMAS ETC)
      console.log(this.form_busqueda.value);

      //FORMULARIO
      // - COLOR
      var color= this.form_busqueda.value.color;

      if (color != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
        color =           // Y LO AÑADO LUEGO A CONSULTA
          `?Agaricales wdt:P787 ?spore_print_color.
          ?Agaricales wdt:P787 wd:` + color + `.` ;
      }

      // - FORMA
      var shape= this.form_busqueda.value.shape;

      if (shape != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
        shape =               // Y LO AÑADO LUEGO A CONSULTA
          `?Agaricales wdt:P784 ?mushroom_cap_shape.
          ?Agaricales wdt:P784 wd:` + shape + `.`;
      }

      // - ESTIRPE  //AHORA ES ESTIPEE CAMBIALOOO CAPULLO MIERDASECA

      var estipe= this.form_busqueda.value.estipe;

      if (estipe != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
        estipe =               // Y LO AÑADO LUEGO A CONSULTA
          `?Agaricales wdt:P786 ?car_cter_del_estipe.
          ?Agaricales wdt:P786 wd:` + estipe + `.`;
      }



      // - ACCESORIO HIMENIO

      var himenio= this.form_busqueda.value.himenio;


      if (himenio != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
        himenio =               // Y LO AÑADO LUEGO A CONSULTA
          `?Agaricales wdt:P785 ?accesorios_del_himenio.
          ?Agaricales wdt:P785 wd:` + himenio + `.`;
      }

       // - TIPO HIMENIO

      var t_himenio= this.form_busqueda.value.t_himenio;


      if (t_himenio != '') {// SI NO HE ESCOGIDO FORMA NO RELLENO, SI HE ESCOGIDO, PONGO EL COMANDO DE BUSQUEDA CORRESPONDIENTE
        t_himenio =               // Y LO AÑADO LUEGO A CONSULTA
          `?Agaricales wdt:P783 ?tipo_de_himenio.
          ?Agaricales wdt:P783 wd:` + t_himenio + `.`;
      }

      // AQUI ESTA LA CONSULTA, AQUI TENEIS QUE ESCOGER LOS PARAMENTROS QUE QUEREIS RECIBIR
      //ESO LO MIRAIS CON CLAUDIA
        var consulta = `SELECT ?Agaricales ?AgaricalesLabel ?comestibilidadLabel ?imagen ?spore_print_colorLabel ?mushroom_cap_shapeLabel ?car_cter_del_estipeLabel ?accesorios_del_himenioLabel WHERE {
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      ?Agaricales (wdt:P171/wdt:P171/wdt:P171/wdt:P171/wdt:P171) wd:Q27720.

      ?Agaricales wdt:P789 ?comestibilidad.
      ?Agaricales wdt:P18 ?imagen.

      `+ color + `
      `+ shape + `
      `+ estipe + `
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
          console.log(result);

            var id = result.Agaricales.value;
            var id2 = this.split(id);
            console.log("ID: " + id2);
            //MOSTRAR LOS RESULTADOS CON NOMBRE, FOTO Y COMESTIBILIDAD
            html +=  //ESTAS LINEAS SON LAS QUE TENEIS QUE MODIFICAR RECORDAD QUE SE VAN SUMANDO AL ESTAR EN UN BUCLE
            '<article class="results" onclick="#">' + //TODO ESTO LUEGO VA DENTRO DEL DIV DE RESULTADOS
              '<a href="identificar.html?Q='+ id2 +'&name='+ result.AgaricalesLabel.value +'"><h3>' + result.AgaricalesLabel.value + '</h3></a>' +
              '<img src=' + JSON.stringify(result.imagen.value) + ' class="results-pic" width="100" alt="Imagen"></img>' +
              '<span> Comestibilidad: ' + JSON.stringify(result.comestibilidadLabel.value)  + '</span>' +
            '</article>'
        }

        if(html == ""){
          html =
          '<p>No se han encontrado resultados para esta busqueda</p>'
        }
        document.getElementById("resultados").innerHTML = html;

    } );

  }

  split(texto){
    // HACE SPLIT EN LA RUTA Y COGE LA ULTIMA PALABRA SEPARADA POR EL CARACTER / --> Q12345
    var pieces = texto.split(/[/]+/);
    var result = pieces[pieces.length-1];
    return result;
  }

}
