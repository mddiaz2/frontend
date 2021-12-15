import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from "../../services/cargar-scripts.service";
import * as AOS from 'aos';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor( private _CargarScripts:CargarScriptsService) { 
    _CargarScripts.Carga(["main"]);
  }


  ngOnInit(): void {
    AOS.init();
  }

}
