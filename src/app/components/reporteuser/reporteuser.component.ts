import { Component, OnInit, Type } from '@angular/core';
import {CargarScriptsService} from "../../services/cargar-scripts.service";
import * as Highcharts from 'highcharts';
import { max } from 'rxjs';
import { DimensionService } from 'src/app/services/dimension.service';
import { AuthService } from 'src/app/services/auth.service';


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-reporteuser',
  templateUrl: './reporteuser.component.html',
  styleUrls: ['./reporteuser.component.css']
})
export class ReporteuserComponent implements OnInit {

  //spider 
  options:any;
  /* options: any = {

    chart: {
        polar: true,
        type: 'line'
    },

    accessibility: {
        description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
        text: 'Calculo global',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ["Innovación Educativa", "Dinamismo Estratégico", "Centrado en el Cliente", "Cultura Digital", "Innovación y EA", "Liderazgo Tecnologico"],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        max:6
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max:6
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    series: [{
        name: 'Puntaje Maximo',
        data: [5,5,5,5,5,5],
        pointPlacement: 'on'
    }, {
        name: 'Puntaje Adquirido',
        data: [1,3,5,4,2,3],
        pointPlacement: 'on'
    }]
   }; */

   //dona
   options1: any;
   options2: any;
   options3: any;
   options4: any;
   options5: any;
   options6: any;
  /* options1: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
  },
  title: {
      text: 'Browser<br>shares<br>2017',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                  fontWeight: 'bold',
                  color: 'white'
              }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
      }
  },
  series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
          ['Chrome', 70.1],
          ['Firefox', 29.9]
      ]
  }]
  } */
type1={
    valor:0,
    nivel:""
}


session:any;
valores:any=[];
valores1:any=[];
recomendaciones:any;

dinamismo_estrategico:any=this.type1;
centrado_en_el_cliente:any=this.type1;
cultura_digital_T_H:any=this.type1;
innovacion_y_Entrega_Ajustada:any=this.type1;
liderazgo_tecnologico:any=this.type1;
innovacion_educativa:any=this.type1;
valorTotal=0
Nivel=["Inicial","Reactivo","Definido","Gestionado","Excelencia"];

recomendacion1:any;
recomendacion2:any;
recomendacion3:any;
recomendacion4:any;
recomendacion5:any;
recomendacion6:any;

  constructor(
    private dimension: DimensionService,
    private auth: AuthService,
    private _CargarScripts: CargarScriptsService
   ) { 
    this.session=this.auth.Sesion();
    _CargarScripts.Carga(["main"]);
  }

  nivel(nombre:any){
    let valor;
    if (nombre==1) {
        valor=this.Nivel[0]
    } else if (nombre==2) {
        valor=this.Nivel[1]
    } else if (nombre==3) {
        valor=this.Nivel[2]
    } else if (nombre==4) {
        valor=this.Nivel[3]
    } else if (nombre==5) {
        valor=this.Nivel[4]
    }
    return valor;
  }

  ngOnInit(): void {
    //console.log("usuario ",this.session);
    this.dimension.findDimensionUser(this.session.nombre).subscribe(async (data)=>{
        //console.log("data ",data.dimension);
        for (let index = 0; index < data.dimension.length; index++) {
            const element = data.dimension[index];
            //console.log("element ",element);
            this.valores.push(element.valor);
            let valor=Math.round((element.valor*100)/5)
            let restante=100-valor;
            let nivel;
            /* console.log("valor ",valor);
            console.log("restante ",restante); */
            if(valor==100){
                this.valores1.push(valor)
                this.valores1.push(restante)
            }else{
                this.valores1.push(valor)
                this.valores1.push(restante)
            }

            if (index==0) {
                this.dinamismo_estrategico=Math.round(element.valor)
                nivel=this.nivel(this.dinamismo_estrategico);
                //console.log("nivel ",this.nivel(this.dinamismo_estrategico));
                this.dimension.findRecomendacion("Dinamismo Estratégico",nivel).subscribe((data)=>{
                    //console.log("dinamismo ",data);
                    this.recomendacion1=data["recomendaciones"][0].descripcion;
                    console.log("dinamismo ",this.recomendacion1);
                });
                this.dinamismo_estrategico={"valor":this.dinamismo_estrategico,"nivel":nivel};
                //console.log("recomendacion dinamismo ",this.recomendancion1);
                //this.dimension.findRecomendacion("Dinamismo Estratégico","");
            } else if (index==1) {
                this.centrado_en_el_cliente=Math.round(element.valor);
                nivel=this.nivel(this.centrado_en_el_cliente);
                this.dimension.findRecomendacion("Centrado en el Cliente",nivel).subscribe((data)=>{
                    this.recomendacion2=data.recomendaciones[0].descripcion;
                    console.log("centrado ",data);
                });
                this.centrado_en_el_cliente={"valor":this.centrado_en_el_cliente,"nivel":nivel};
            } else if (index==2) {
                this.cultura_digital_T_H=Math.round(element.valor)
                nivel=this.nivel(this.cultura_digital_T_H);
                this.dimension.findRecomendacion("Cultura Digital, Talento y Habilidades",nivel).subscribe((data)=>{
                    this.recomendacion3=data.recomendaciones[0].descripcion;
                    console.log("cultura ",data);
                    
                });
                this.cultura_digital_T_H={"valor":this.cultura_digital_T_H,"nivel":nivel};
            } else if (index==3) {
                this.innovacion_y_Entrega_Ajustada=Math.round(element.valor)
                nivel=this.nivel(this.innovacion_y_Entrega_Ajustada);
                this.dimension.findRecomendacion("Innovación y Entrega Ajustada",nivel).subscribe((data)=>{
                    this.recomendacion4=data.recomendaciones[0].descripcion;
                    console.log("innovacion ",data);
                });
                this.innovacion_y_Entrega_Ajustada={"valor":this.innovacion_y_Entrega_Ajustada,"nivel":nivel};
            } else if (index==4) {
                this.liderazgo_tecnologico=Math.round(element.valor)
                nivel=this.nivel(this.liderazgo_tecnologico);
                this.dimension.findRecomendacion("Liderazgo Tecnológico",nivel).subscribe((data)=>{
                    this.recomendacion5=data.recomendaciones[0].descripcion;
                    console.log("liderazgo y entrega ",data);
                });
                this.liderazgo_tecnologico={"valor":this.liderazgo_tecnologico,"nivel":nivel};
            } else if (index==5) {
                this.innovacion_educativa=Math.round(element.valor);
                nivel=this.nivel(this.innovacion_educativa);
                this.dimension.findRecomendacion("Innovación Educativa",nivel).subscribe((data)=>{
                    this.recomendacion6=data.recomendaciones[0].descripcion;
                    console.log("innovacion educativa ",data);
                });
                this.innovacion_educativa={"valor":this.innovacion_educativa,"nivel":nivel};

            }
        }
        console.log("dimension ",this.valores);
        
        console.log("porcentaje calculado ",this.valores1);
        
        //suma de todas las dimensiones total calculado
        this.valorTotal=(this.dinamismo_estrategico.valor+this.centrado_en_el_cliente.valor+this.cultura_digital_T_H.valor+ this.innovacion_y_Entrega_Ajustada.valor+this.liderazgo_tecnologico.valor+this.innovacion_y_Entrega_Ajustada.valor)/6
        //this.valorTotal=1
        this.valorTotal=Math.round(this.valorTotal);
        

        //spider
        this.options=
            {
                chart: {
                    polar: true,
                    type: 'line'
                },
            
                accessibility: {
                    description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
                },
            
                title: {
                    text: 'Calculo global',
                    x: -80
                },
            
                pane: {
                    size: '80%'
                },
            
                xAxis: {
                    categories: ["Dinamismo Estratégico", "Centrado en el Cliente", "Cultura Digital", "Innovación y EA", "Liderazgo Tecnologico","Innovación Educativa"],
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                    max:6
                },
            
                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0,
                    max:6
                },
            
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
                },
            
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical'
                },
            
                series: [{
                    name: 'Puntaje Maximo',
                    data: [5,5,5,5,5,5],
                    pointPlacement: 'on'
                }, {
                    name: 'Puntaje Calculado',
                    data: this.valores,
                    pointPlacement: 'on'
                }]
               }

               //dona
               this.options1= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Dinamismo<br>Estratégico',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Porcentaje de la dimensión',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[0]],
                     ['Porcentaje Total', this.valores1[1]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }

              
               Highcharts.chart('red', this.options); 
               Highcharts.chart('dona1', this.options1);

               this.options2= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Centrado<br>en el<br>Cliente',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Porcentaje de la dimensión',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[2]],
                     ['Porcentaje Total', this.valores1[3]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }
               Highcharts.chart('dona2', this.options2);


               this.options3= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Cultura<br>Digital<br>T&H',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Cultura Digital',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[4]],
                     ['Porcentaje Total', this.valores1[5]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }
               Highcharts.chart('dona3', this.options3);

               this.options4= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Innovación<br>y<br>Entrega Ajustada',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Porcentaje de la dimension',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[6]],
                     ['Porcentaje Total', this.valores1[7]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }
               
               Highcharts.chart('dona4', this.options4);

               this.options5= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Liderazgo<br>en<br>Tecnología',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Porcentaje de la dimension',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[8]],
                     ['Porcentaje Total', this.valores1[9]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }
               
               Highcharts.chart('dona5',this.options5);


               this.options6= {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: 0,
                  plotShadow: false
              },
              title: {
                  text: 'Innovación<br>Educativa',
                  align: 'center',
                  verticalAlign: 'middle',
                  y: 60
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                  point: {
                      valueSuffix: '%'
                  }
              },
              plotOptions: {
                  pie: {
                      dataLabels: {
                          enabled: true,
                          distance: -50,
                          style: {
                              fontWeight: 'bold',
                              color: 'white'
                          }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                  }
              },
              series: [{
                  type: 'pie',
                  name: 'Porcentaje de la dimension',
                  innerSize: '50%',
                  data: [
                     ['Porcentaje Calculado',this.valores1[10]],
                     ['Porcentaje Total', this.valores1[11]]
                      /* ['Chrome', 70.1],
                      ['Firefox', 29.9] */
                  ]
              }]
              }
              Highcharts.chart('dona6', this.options6);
    });
   /*  Highcharts.chart('red', this.options);
    Highcharts.chart('dona', this.options1); */
  }

  ngAfterViewInit() {
    
  }

  

  
  
  //Highcharts: typeof Highcharts = Highcharts;

 
  /* chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  }; */
  

 

  

}
