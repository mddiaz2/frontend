import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {
  url="https://metdies.azurewebsites.net"
  //port=3000;
  //ruta="saveUser";
  constructor(private http: HttpClient) { }

  saveDimension(dimension:any){
    localStorage.setItem('dimension', JSON.stringify(dimension));
  }

  closeDimension(params:any){
    this.http.post<any>(`${this.url}:/api/saveCuestionario`,params).subscribe((data:any)=>{
      console.log("data enviada ",data);
    });
  }

  /* findDimensionAll(){
    return this.http.post<any>(`${this.url}:${this.port}/api/findDimensionAll`,{})
  } */
  findDimensionUser(dimension:any){
    return this.http.post<any>(`${this.url}:/api/findCuestionarioUser`,{"nombre":dimension})
  }

  async findDimensionAll1(params:any){
    return await this.http.post<any>(`${this.url}:/api/findDimensions`,params).toPromise();
  }

  findDimension(dimension:any){
    return this.http.post<any>(`${this.url}:/api/findCuestionarioDimension`,{"nombre":dimension})
  }


  loadDimension(){
    return JSON.parse(""+localStorage.getItem('dimension'));
  }

  //save all dimensions answered
  saveDimensions(dimensions:any){
    localStorage.setItem('dimensions', JSON.stringify(dimensions));
  }

  loadDimensions(){
    return JSON.parse(""+localStorage.getItem('dimensions'));
  }

  //recomendacion
  
  findRecomendacion(nombre:any,nivel:any){
    /* return new Promise(resolve => {
      resolve(
        this.http.post<any>(`${this.url}:${this.port}/api/findCuestionarioDimension`,{"nombre":nombre,"nivel":nivel}).toPromise()
      );
    }); */
    //console.log("nombre ",nombre," nivel ",nivel);
    //nivel="Gestionado"
    return this.http.post<any>(`${this.url}:/api/findRecomendacion`,{"nombre":nombre,"nivelcalculado":nivel});
  }

}
