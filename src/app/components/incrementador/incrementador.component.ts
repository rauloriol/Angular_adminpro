import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // *(43) del componente Padre ((progress.component)) envia dos parametros que son leyenda y porcentaje y los  recibe incrementador como @Input
  @Input()  leyenda:string='Leyenda';
  @Input() porcentaje:number = 50;

  //* (44) 4.09min sintaxis para emitir un numero como un evento $..
  @Output() updateValores:EventEmitter<number> = new EventEmitter();

  //* (46) 1.58 min es un decorador que esta en el html y se indica con el  <input #txtNumero type=.....
  //* con esto tengo una referencia sin importar en el componente en el que estoy y evito que al introducir numeros raros en el imput se saalgan de rango
  @ViewChild('txtNumero') txtNumero:ElementRef;


  constructor() {

    /* console.log('Leyenda',this.leyenda);
    console.log('Porcentaje',this.porcentaje); */

   }
  ngOnInit(): void {
  }


  //(45) Es una funcion del ngmodelChange para cuando cambio los valores escribiendolos en la barra de impunt
  cambio(nuevoNumero:number){

    if (nuevoNumero>=100) {
      this.porcentaje=100;

    }
    else if (nuevoNumero<=0) {
      this.porcentaje=0;
    }
    else if (nuevoNumero === null) {
      this.porcentaje=0;
    }

    else{
      this.porcentaje=nuevoNumero;
    }

    /* elemntHtml.value= Number (this.porcentaje); //(45) Con eso lo que hacemos es tomar el progreso y que no se puedan poner numeros extraños */

    this.updateValores.emit(this.porcentaje);
    this.txtNumero.nativeElement.value=this.porcentaje; //*(46) la forma con la que viewChild ayuda a cambiar  tomando el progreso y que no se puedan poner numeros extraños */


  }

  // para sumar o restar valores
  cambiarValor(valor:number){

    if ( this.porcentaje>=100 && valor > 0) {
      this.porcentaje=100;
      return;
    }

    if  (this.porcentaje<=0 && valor < 0) {
      this.porcentaje=0;
      return;
    }

    this.porcentaje=this.porcentaje + valor;

    //*(44)  4.54 min-> voy a emitir el valor numerico de this.porcentaje
    this.updateValores.emit(this.porcentaje);

    this.txtNumero.nativeElement.focus(); // centramos la edicion en este punto
}


}









