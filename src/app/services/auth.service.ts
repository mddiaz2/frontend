import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="https://metdies.azurewebsites.net"
  //port=3000;
  //ruta="saveUser";
  constructor(private http: HttpClient) { }

  saveUser(params:any) {
    this.http.post<any>(`${this.url}:/api/saveUser`,params).subscribe((data)=>{
      console.log("error ",data);
    })
  }

  findUser(params:any) {
    return this.http.post<any>(`${this.url}:/api/findUser`,params);
  }


  setEstate(param:any){
    localStorage.setItem('estado',param);
  }

  findEstado(){
    return localStorage.getItem('estado');
  }

  removeEstado(){
    localStorage.removeItem('estado');
  }

  Initsesion(user:any){
    localStorage.setItem('session', JSON.stringify(user));
  }

  Sesion(){
    return JSON.parse(""+localStorage.getItem('session'));
  }

  clearSesion(){
    localStorage.clear();
  }


  async findUsers() {
    return await this.http.post<any>(`${this.url}:/api/findUserAll`, {});
    //return await this.http.post<any>(`${this.url}:${this.port}/api/findUserAll`, {}).toPromise();
  }
}
