import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { DimensionService } from 'src/app/services/dimension.service';
import { CargarScriptsService } from "../../services/cargar-scripts.service";
import { DOCUMENT } from '@angular/common'; 
import { AuthService } from 'src/app/services/auth.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //dimensiones: any[] = [];
  condicion="0";
  dimensiones: any;
 dimension1:any;
  session:any;
  @ViewChild('myDiv') myDiv: ElementRef | undefined
  constructor(
    private _CargarScripts: CargarScriptsService,
    private dimension: DimensionService,
    private auth: AuthService,
    private router: Router,
    private elRef: ElementRef,
    
    
  ) {
    this.session=this.auth.Sesion()
    //var div = this.elRef.nativeElement.querySelector('div');
    /* var div = this.elRef.nativeElement.query()
    console.log("lista");
    console.log(div); */
    console.log("lista");
    
    _CargarScripts.Carga(["main"]);
  }
  ngAfterViewInit() {
    //console.log(this.elRef.nativeElement);
    //console.log("div")
    //var div = this.elRef.nativeElement.querySelector('html body.mat-typography app-root app-menu div.container div.row div.col-4');
    //console.log(div.children);
  //div.children.classList.add();

    //var div2=document.getElementsByClassName('div.container')
    //console.log(div2)
    //var div2=document.getElementById('div.container');
    
    
    //console.log(this.myDiv?.nativeElement);
}

async ngOnInit() {
    //console.log(this.myDiv.nativeElement.innerHTML);
    //DebugElement.query(By.css('[attribute]'));
    //console.log(By.css('[]'))
    console.log("dimensiones");
    this.dimensiones=await this.dimension.findDimensionAll1({"usuario":this.session.nombre})/* .then((data)=>{
    
    }) */
    this.dimensiones=this.dimensiones["dimensiones"];

    if(this.dimensiones.length==0){
      this.condicion="1"
    }else{
      this.condicion="2"
    }
    //console.log("data ",this.dimensiones)
    //this.dimension.findDimensionAll1({});

  }

  onclick(direccion: any) {
    //console.log("direccion ",direccion);
    if(this.condicion=="1"){
      this.router.navigate(['/repouser']);
    }else{
      this.dimension.saveDimension(direccion);
      this.router.navigate(['/dinamismo']);
    }
    
    //this.router.navigate(["/" + direccion]);
    //this.router.navigate(['/menu']);
  }

}
