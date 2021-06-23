import { Component  } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjsraul',
  templateUrl: './rxjsraul.component.html',
  styles: [
  ]
})
export class RxjsraulComponent  {

  constructor() {

    let numeroAditivo = -1;
    //*Primer Caso**
  /* //(77) Creacion del observable
  const observadorr = new Observable( resultado => {
    setInterval( ()=>{
      console.log("Pasados 2 segundos vemos el mensaje");
    },2000 )

  });
  //(77) finalmente nos susbcribimos al observador
  observadorr.subscribe();
 */

  //* Segundo caso

  const obser2 = new Observable ( observadorRaul => {



    const intervalo = setInterval( ()=>{

      numeroAditivo++;
      observadorRaul.next(numeroAditivo); //* Funcion que se ejecuta cuando se EMITE el siguiente valor

      if(numeroAditivo === 4){

        clearInterval(intervalo);
        observadorRaul.complete(); // me desuscrivo del observador al cumplir la condicion de 4

      }

     /*  if (numeroAditivo === 2) {

        observadorRaul.error('Ha llegado al errorrr!!');

      } */

    }, 2000 );

  });

  // nos suscribimos al observador y tiene los diferentes argumentos, subuscribe([valorEmitido], error,()=> cuando se finaliza el observable)
  obser2.subscribe(
    valorEmitido => console.log('Subscripcion de raul',valorEmitido),
    err=>console.warn('Error raul: =>',err),
    ()=> console.log('Observable de raul ha terminado ')
  );






}

}
