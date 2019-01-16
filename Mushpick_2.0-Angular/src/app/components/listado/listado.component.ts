import { Component, OnInit } from '@angular/core';
import { WikidataService } from '../../services/wikidata.service';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  private antes = "Q131868";
  private array =[];


  constructor(public _wikidataService:WikidataService, private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.prueba('Q131868', '0', '');
  }

  prueba2(){
    console.log("la antes"+ this.antes);
    if(this.antes =='0'){
      console.log("es la ultima ");

    }else{
      console.log("HACIA ATRAS");
      this.prueba(this.antes, '0', '');
    }


  }

  prueba(n, a, name){
    //console.log("PRUEBAAAAA");
    console.log("hola"+ n + a + name);
    this.antes=a;
    console.log("AHORA ANTES ES: "+ this.antes + " "+ a);
    a=n;
    let consulta = `SELECT DISTINCT ?Agaricales ?AgaricalesLabel WHERE {
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    ?Agaricales wdt:P171 wd:`+n+ `.
    ?_Agaricales wdt:P171* ?Agaricales.
    ?_Agaricales wdt:P789 ?comestibilidad.
    }
  `;

  //console.log(consulta);

  //DESDE AQUI HASTA ....
  const endpointUrl = 'https://query.wikidata.org/sparql',
        sparqlQuery = consulta ,
        fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
        headers = { 'Accept': 'application/sparql-results+json' };

  fetch( fullUrl, { headers } ).then( body => body.json() ).then( json => {
      const { head: { vars }, results } = json;
      //...AQUI NO SE TOCA
      //console.log("hola: " + results); //MUESTRO TODOS LOS RESULTADOS DE LA CONSULTA, ES UN VECTOR
      //RESULT BINDINGS ES EL VECTOR CON TODOS LOS RESULTADOS
      if(results.bindings.length !=0){
          this.array=[]; //reiniciamos el array

          let n_results = 0;

          //DENTRO DE EL VECTOR RESULT.BINDINGS CADA RESULTADO ES EL RESULT JUSTO AKI ABAJO SE HACE ESO
          for ( const result of results.bindings ) {

            var Q=result.Agaricales.value;
            //console.log("EL NOMBRE: " + result.AgaricalesLabel.value);
            name = result.AgaricalesLabel.value;
            //console.log(Q);
            var objetoQ = this.split(Q);
            //console.log("OBJETOQ: " + objetoQ);

            let familia ={
              anterior:objetoQ,
              este:a,
              nombre:name
            }
            this.array.push(familia);
          }

          }else{
            console.log("ULTIMA" + n); // EN N ESTA ALMACENADA LA Q DE LA SETA QUE HAY QUE MOSTRAR
            this.router.navigate(['/identificar', 'Q']);
            //window.location.href= "identificar.html?Q="+n+"&name=" + name;
          } //+"name="+nombre


  } );
  }

  split(texto){
    // HACE SPLIT EN LA RUTA Y COGE LA ULTIMA PALABRA SEPARADA POR EL CARACTER / --> Q12345
    var pieces = texto.split(/[/]+/);
    var result = pieces[pieces.length-1];
    return result;
  }
}
