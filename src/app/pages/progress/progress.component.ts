import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  // Das valores o sinos son los valores que he puesto por defecto en el componente padre (incrementador.component.ts)
  porcentaje1: number = 20;
  porcentaje2: number = 30;


  constructor() { }

  ngOnInit(): void {
  }


  /* //(44) envento output recibido delhijo
  actualizar(event: number){

    /* console.log('recibo',event); */





  //(41) Funcion para sumar valores a la barra de progreso
  // se encuentra en incrementador.componente.ts
 /*  cambiarValor(valor:number){

    if ( this.porcentaje1>=100 && this.porcentaje2>=100 &&  valor > 0) {
      this.porcentaje1=100;
      this.porcentaje2=100;
      return;
    }
    if  (this.porcentaje1<=0 && this.porcentaje2<=100  && valor < 0) {
      this.porcentaje1=0;
      this.porcentaje2=0;
      return;
    }

    this.porcentaje1=this.porcentaje1 + valor;
    this.porcentaje2=this.porcentaje2 + valor;

} */

}
