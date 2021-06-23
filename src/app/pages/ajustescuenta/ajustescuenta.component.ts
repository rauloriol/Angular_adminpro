import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-ajustescuenta',
  templateUrl: './ajustescuenta.component.html',
  styleUrls: ['./ajustescuenta.component.css']
})
export class AjustescuentaComponent implements OnInit {


   // *(63) esto se hace con javascrip vanilla (el antiguo) y con el # y el nombre del (id) que esta en index.html que define a los temas
 public linkThemeraul =  document.querySelector('#theme'); // con esto ya me enlaza el link
 public linkDelHtml;


  constructor( private _ajustesServicio:SettingsService ) { } // (65) inyectamos el servicio


  ngOnInit(): void {

    this.linkDelHtml  = document.querySelectorAll('.selector'); // *(64) nos dice en que tema estamos mediante la etiqueta html, utilizamos vanilla javascript
    this.checkTemaActual();

  }

  cambiarTema(tema:string) {

    this._ajustesServicio.cambiarTema(tema); //(65) hemos reduciodo el codigo por que lo hemos colocado en el servicio

    this.checkTemaActual(); // ()64) añadimos el tema actual aqui


  }



//(64)  7.31 MIN para que aparezca el tick en el color cuando lo elegimos
checkTemaActual(){

  this.linkDelHtml.forEach( itemLista => {

      itemLista.classList.remove('working');  // tomamos esas etiquetas y las recorremmos con el for y si existe un working, lo eliminamos

      const btnTheme = itemLista.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const btnCurrentTheme = this.linkThemeraul.getAttribute('href');

      // cuando ya tenemos todas las etiquetas cogidas mediante vanilla javascript hacremos la condicion para que añadiendo working al final de la etiqueta
      // nos aparezca el tick cuanod seleteccionamos un tema

      if (btnThemeUrl === btnCurrentTheme) {
        //añadimos..
        itemLista.classList.add('working'); // añadimos una clase que se llama working para que se coloque el tick
      }

    });

}

}
