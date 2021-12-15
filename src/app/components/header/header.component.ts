import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {CargarScriptsService} from "../../services/cargar-scripts.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _CargarScripts:CargarScriptsService,
    private auth:AuthService,
    private router: Router
    ) { 
    //_CargarScripts.Carga(["main"]);
    this.session=this.auth.Sesion()
  }
  session: any;
  header: any;
  ngOnInit(): void {
    
    //console.log("session ",this.session);
    if(this.session==undefined){
      console.log("no existe session");
      this.header="0"
    }else{
      console.log("session existente");
      this.header="1";
      console.log("nombre ",this.session.nombre," niveleducacion ",this.session.niveleducacion)
    }
  }

  closeSession(){
    this.auth.clearSesion();
    this.router.navigate(['/']);
    console.log("session cerrada")
  }

}
