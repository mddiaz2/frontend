import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {
  estado:any;
  constructor(
    private auth:AuthService
  ) {
    this.estado=auth.findEstado();
   }

  ngOnInit(): void {
    this.estado=this.auth.findEstado();
  }

}
