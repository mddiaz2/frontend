import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, Observable, startWith, switchMap, of as observableOf } from 'rxjs';
import { MatSort, SortDirection } from '@angular/material/sort';
import { DimensionService } from 'src/app/services/dimension.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { Router } from '@angular/router';
import { CargarScriptsService } from "../../services/cargar-scripts.service";
//import * as $ from 'jquery';
//declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-dinamismo',
  templateUrl: './dinamismo.component.html',
  styleUrls: ['./dinamismo.component.css']
})
export class DinamismoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'respuesta'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any[] = [];
  todo: any;

  exampleDatabase!: ExampleHttpDatabase | null;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private dimension: DimensionService, public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private _CargarScripts: CargarScriptsService
  ) {  _CargarScripts.Carga(["main"]); }

  titulo: any;
  preguntas: any[] = [];


  ngAfterViewInit() {

    this.titulo = this.dimension.loadDimension()
    this.titulo = this.titulo.nombre;
    //console.log("titulo ",this.titulo)
    this.exampleDatabase = new ExampleHttpDatabase(this.dimension);

    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(this.titulo)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          //this.resultsLength = data.preguntas.length;
          //this.resultsLength=2;
          /* this.dataSource = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; */
          //pageSize 
          return data;
        })
      ).subscribe(data => {
        //console.log(data);
        //console.log(data.preguntas);
        this.todo = data;
        console.log("---------")
        for (let index = 0; index < data.preguntas.length; index++) {
          
          var element = data.preguntas[index].value;
          //console.log("elemento ",element);
          this.preguntas.push({ "pregunta": element.pregunta, "respuesta": "0", "metrica": data.preguntas[index].key });
        }
       
        //console.log("termino preguntas",this.data) 
        //console.log("termino preguntas",this.preguntas); 
        this.dataSource = new MatTableDataSource<any>(this.preguntas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //this.data = this.preguntas;

      });
  }

  async ngOnInit() {
    this.titulo = this.dimension.loadDimension()
    this.titulo = this.titulo.nombre;
    //await this.objeto(preguntas);
  }

  array = [
    {
      id: 1,
      selected: false
    },
    {
      id: 2,
      selected: false
    },
    {
      id: 3,
      selected: false
    },
    {
      id: 4,
      selected: false
    },
    {
      id: 5,
      selected: false
    }
  ];

  /* radioChecked(id: any,e:any) {
    console.log("elemento ",e);
    preguntas.map((el)=> {
      if(el.pregunta===e.pregunta){
        el.respuesta=id
        el.valores.map((item:any) => {
          if (item.id !== id) {
            item.selected = false;
          } else {
            item.selected = true;
          }
          return item;
        });
        return el;
      }
    });
  } */


  lista = [0, 1, 2, 3, 4, 5];
  onChange(event: any, pregunta: any) {
    //console.log("pregunta ",pregunta.pregunta);
    //console.log("respuesta ",event.target.value);
    for (let index = 0; index < this.preguntas.length; index++) {
      const element = this.preguntas[index];
      if (pregunta.pregunta === element.pregunta) {
        this.preguntas[index].respuesta = event.target.value;
      }
    }
    //this.dataSource = new MatTableDataSource<any>(this.preguntas);
    /* console.log("-----------------")
    console.log("preguntas ",this.preguntas);
    console.log("-----------------") */
  }


  objeto(Preguntas: any) {

    /* let preguntas1:any;
    preguntas1=Preguntas;
    preguntas=[];
    for (let index = 0; index < preguntas1.length; index++) {
      let item={"pregunta":preguntas1[index].pregunta,"respuesta":0};
      preguntas.push(item)
    }
    console.log("termino preguntas",preguntas) */
  }



  async guardar() {
    console.log("guardar datos")
    
    //console.log("preguntas ",this.preguntas);
    //console.log("termino preguntas",this.data) 
    let condicion = false;
    let salir = false;
    for (let index = 0; index < this.preguntas.length && salir == false; index++) {
      const element = this.preguntas[index];
      if (element.respuesta != "0") {
        condicion = true;
      } else {
        condicion = false;
        salir = true;
      }

    }

    if (condicion == false) {
      this.auth.setEstate("4");/*  */
      let dialogRef = this.dialog.open(DialogoComponent);
    } else {
      //console.log("termino preguntas",this.todo) 
      let subdimensiones = this.todo["subdimensiones"];
      let elementos = this.todo["elementos"];
      let metricas = this.todo["metricas"];

      let metricasBase;
      let elementosBase;
      let subdimensionesBase;
      //console.log("metricas ",metricas);
      //console.log("elementos ", elementos);
      //console.log d("subdimensiones ",subdimensiones);
      let aux=[];
      let aux1=[];
      let preguntas1=[];
      //table metricas for the base
      for (let index = 0; index < this.preguntas.length; index++) {
        const element = this.preguntas[index];
        const element1 = metricas[index].value[0];

        if (element.metrica === element1.nombre) {

          let valor = parseInt(element.respuesta) * element1.peso;
          this.data.push({ "metrica": element1.nombre, "calificacion": 1 });
          aux.push(valor);
          preguntas1.push({"pregunta":element.pregunta,"respuesta":element.respuesta})

        } else {

        }
      }

      metricasBase = this.data;
      //console.log("metricasBase ",metricasBase);
      this.data = [];
      //
      let maximo=aux.length;
      let contador=0;

      //table elementos for the base
      for (let index = 0; index < elementos.length; index++) {
        const element = elementos[index];
        
        let sumatotalSubdimension=0;
        for (let index1 = 0; index1 < element.value.length; index1++) {
          
          const element1 = element.value[index1];
          //console.log("elemento 1",element1);
          let valor = aux[contador]* element1.peso;
          this.data.push({"elemento":element1.nombre,"porcentaje_calculado":valor,"peso":element1.peso})
          contador++;
          sumatotalSubdimension=valor+sumatotalSubdimension;
        }
        aux1.push({"Subdimension":element.key,"porcentaje_calculado":sumatotalSubdimension});
      }

      elementosBase=this.data
      this.data = [];
      aux=[];

      maximo=elementos.length;
      contador=0;


      let sumatotal=0;
      //table subdimensiones for the base
      for (let index = 0; index < aux1.length; index++) {
        const element1 = subdimensiones[index];
        const element = aux1[index];
        //console.log("subdimension ",element1," calculo ",element);
        let valor = element.porcentaje_calculado* element1.peso;
        this.data.push({"subdimension":element1.nombre,"porcentaje_calculado":valor,"peso":element1.peso});

        sumatotal=sumatotal+valor
      }
      subdimensionesBase=this.data
      let dimension=this.dimension.loadDimension()
      let valorDimension=sumatotal*dimension.peso

      console.log("---------")
      console.log(metricasBase)
      console.log("---------")
      console.log(elementosBase)
      console.log("---------");
      console.log(subdimensionesBase);
      console.log("---------");
      dimension={"dimension":dimension.nombre,"peso":dimension.peso,"porcentaje_calculado":valorDimension}
      //console.log("dimension ",dimension);
      let usuario=this.auth.Sesion()
      //console.log("usuario ",usuario)
      let params={"dimension":dimension,"subdimensiones":subdimensionesBase,"elementos":elementosBase,"metricas":metricasBase,"preguntas":preguntas1,"usuario":usuario.nombre,"nombre":this.titulo}
      //console.log("params ",params);
      await this.dimension.closeDimension(params);
      this.router.navigate(['/menu']);
      
    }
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/* export interface Pregunta {
  pregunta: string;
}

var preguntas: any[] = [
  {num:"1",pregunta:"¿Su Institución de Educación ha establecido procesos para garantizar que sus estudiantes sean competentes en la integración de tecnologías en sus practicas de aprendizaje?"},
  {num:"2",pregunta:"¿Su Institución de Educación ha establecido procesos para garantizar que su personal docente sea competente en la integración de tecnologías en sus practicas de enseñanza?"},
  {num:"3",pregunta:"¿Su Institución de Educación socializa los riesgos y promueve el comportamiento responsable en entornos online?"},
  {num:"4",pregunta:"¿Su Institución de Educación considera las Competencias Digitales (DC) en las valoraciones de rendimiento de los estudiantes?"},
  {num:"5",pregunta:"¿Su Institución de Educación considera las Competencias Digitales (DC) en las valoraciones de rendimiento del personal docente?"},
  {num:"6",pregunta:"¿Su Institución de Educación promueve en su personal docente la integración de tecnologías en las prácticas de enseñanza y aprendizaje?"},
  {num:"7",pregunta:"¿Su Institución de Educación 'rediseña' su metodología de enseñanza para incorporar tecnologías digitales?"},
  {num:"8",pregunta:"¿Su Institución de Educación utiliza metodologías de prueba en línea para garantizar información de retorno inmediata?"},
  {num:"9",pregunta:"¿Su Institución de Educación anima a los estudiantes a ser creadores y también consumidores de contenido digital especifico de cada asignatura?"},
  {num:"10",pregunta:"¿Su Institución de Educación anima al personal docente a ser creadores y también consumidores de contenido digital especifico de cada asignatura?"},
  {num:"11",pregunta:"¿Su Institución de Educación establece políticas y procedimientos para garantizar que las partes interesadas estén bien informadas acerca de las normas de propiedad intelectual?"},
  {num:"12",pregunta:"¿Su Institución de Educación tiene establecidas políticas y procedimientos con respecto a las licencias para el contenido?"},
  {num:"13",pregunta:"¿Su Institución de Educación promueve entre sus estudiantes el uso/recombinación/creación de REA?"},
  {num:"14",pregunta:"¿Su Institución de Educación promueve entre su personal docente el uso/recombinación/creación de Recursos Educativos Abiertos (REA)?"},
  {num:"15",pregunta:"¿Su Institución de Educación apoya modelos Bring Your Own Device (BYOD) (Traiga su propio dispositivo)?"},
  {num:"16",pregunta:"¿Su Institución de Educación utiliza tecnologías de asistencia para atender a las necesidades especiales de los estudiantes?"},
  {num:"17",pregunta:"¿Las actividades de networking e intercambio de conocimiento se reconocen como resultados de aprendizaje relevantes profesionalmente?"},
  {num:"18",pregunta:"¿Su Institución de Educación establece procesos, apoyados por herramientas y plataformas digitales para reunir a las partes interesadas internas (personal y estudiantes)?"}
]; */

/* export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient
    ) {}

  getRepoIssues(dimension:any): Observable<any> {
    const href = 'http://localhost:3000/api/findCuestionarioDimension';
    const requestUrl =
        `${href}`;

    return this._httpClient.post<any>(requestUrl,{"dimension":dimension});
  }
} */
export class ExampleHttpDatabase {
  constructor(private dimension: DimensionService
  ) { }

  getRepoIssues(titulo: any): Observable<any> {
    const href = 'http://localhost:3000/api/findCuestionarioDimension';
    const requestUrl =
      `${href}`;

    return this.dimension.findDimension(titulo);
  }
}
