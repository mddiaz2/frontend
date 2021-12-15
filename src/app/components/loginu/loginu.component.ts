import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CargarScriptsService } from "../../services/cargar-scripts.service";
import { DialogoComponent } from '../dialogo/dialogo.component';
//import * as AOS from 'aos';




@Component({
  selector: 'app-loginu',
  templateUrl: './loginu.component.html',
  styleUrls: ['./loginu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginuComponent implements OnInit {

  lista: string[] = ["Universidad", "Escuela Politécnica", "Instituto Superior Técnico", "Instituto Superior Técnológico", "Instituto Superior Pedagógico", "Conservatorio Superior"];


  constructor(private _CargarScripts: CargarScriptsService,
    
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {_CargarScripts.Carga(["main"]);

  }


  form1: FormGroup | undefined;

  ngOnInit(): void {
    //AOS.init();
    /* this.form1 = new FormGroup({
      email: new FormControl("", Validators.compose([
         Validators.required,
         Validators.pattern("/^\S+@\S+\.\S+$/")
      ])),
      password: new FormControl("")
   }); */
  }
  registro(g: NgForm) {
    if (g.valid) {
      console.log("valid")
      this.auth.saveUser(g.value);
      this.auth.setEstate("3");
      let dialogRef = this.dialog.open(DialogoComponent);
      this.router.navigate(['/menu']);
    } else {
      this.auth.setEstate("2");
      let dialogRef = this.dialog.open(DialogoComponent);
    }
    //console.log(f.valid);  // false
  }

  async login(f: NgForm) {
    if (f.valid) {
      
      let user = await this.auth.findUser(f.value);
      user.subscribe((data) => {
        console.log(data.userFind)
        this.auth.Initsesion(data.userFind);
        this.router.navigate(['/menu']);
        
      }, error => {
        this.auth.setEstate("2");/*  */
        let dialogRef = this.dialog.open(DialogoComponent);
      });
    } else {
      this.auth.setEstate("1");
      let dialogRef = this.dialog.open(DialogoComponent);
    }
    //console.log(f.valid);  // false
  }
}


