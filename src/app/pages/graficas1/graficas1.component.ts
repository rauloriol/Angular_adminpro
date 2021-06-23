import { Component, Output } from '@angular/core';



@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
export class Graficas1Component  {


 public labels1:string[] = ['Descargas', 'En tienda', 'Pedidos']; //(55) 7.49 min propiedad de las etiquetas de loas graficas

 public data1 = [  //(55) 8.40 min propiedad de las etiquetas de loas graficas
   [350, 450, 100]
];
public data2 = [  //(55) 8.40 min propiedad de las etiquetas de loas graficas
  [35, 15, 12]
];



}
