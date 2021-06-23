import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent  {


  public titulo:string;
  public tituloSubs$:Subscription

  //  (84) para tomar los valores de titulo de app-routing, lo instanciamos y luego lo llamamos
  constructor( private route:Router) {

  this.verTituloEncabezado();

  }


   verTituloEncabezado(){
     // (84) 6.42min con este pipe lo que se hace es solo restringir la salida de ActivationEnd que es donde tento las data con el titulo de cada ruta
     this.route.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event:ActivationEnd) =>event.snapshot.firstChild === null), // asi solo saca por consola el primer asctivacionEnd que tiene la data
        map((event:ActivationEnd) =>event.snapshot.data),
      )

      .subscribe(data =>{
      /*   console.log(data); // En activacionEnd tenemos la informacion del titulo */
        this.titulo=data.titulo; //* (84) con esto ya despues de tomas los valores de ActivationEnd ya tenemos el vlaor que buscamos, ya podemos ir al html y ponerlo

        // para colocar tambien el tiulo en la pestaña superiror lo hacemos con java vanilla mediante document.title
        document.title=`AdminPro - ${data.titulo} ` ;

      });
   }



}
