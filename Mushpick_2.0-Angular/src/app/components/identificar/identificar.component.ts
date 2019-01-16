import { Component, OnInit } from '@angular/core';
import { WikidataService } from '../../services/wikidata.service';

@Component({
  selector: 'app-identificar',
  templateUrl: './identificar.component.html',
  styleUrls: ['./identificar.component.css']
})
export class IdentificarComponent implements OnInit {

  constructor( public _wikidataService:WikidataService ) { }

  ngOnInit() {
  }

}
