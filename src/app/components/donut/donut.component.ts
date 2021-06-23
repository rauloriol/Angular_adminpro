import { Component, Input, Output } from '@angular/core';

// (54) graficas
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

// TODO, todos los imports se exportan en el html y son valores por defecto, hasta que se definen nuevos valores en el componente hijo => (Graficas1)

  @Input() titulo:string='Sin titulo'; //(56) 0.34 min este valor lo recibe donut.componente.html o el html que quiera sino
                                        //* doy valor a titulo, por defecto toma el valor "Sin titulo"


 // Doughnut
 //* doy valor a [labels], por defecto toma el valor "Etiqueta 1 , Etiquta2 ..." y lo puedo recibir en html
 @Input('labels') doughnutChartLabels: Label[] = ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3']; // (55) 7.49 min las exportamos a graficas1.component.html

 //* doy valor a [data], por defecto toma el valor "10 ,15,20" y lo puedo recibir en html
 @Input('data') doughnutChartData: MultiDataSet = [  // (55) 7.8.40 min las exportamos a graficas1.component.html

   [1, 1, 1]
 ];
 public doughnutChartType: ChartType = 'doughnut'; // es el tipo de grafico que pinta

 //(54) 6.57min Es un arreglo donde vamos a definiar cada uno de los colores de las graficas
 public colors:Colors[]=[

   {backgroundColor:['#6857E6','#009FEE','#F02059']}

 ];


 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
   console.log(event, active);
 }


}
