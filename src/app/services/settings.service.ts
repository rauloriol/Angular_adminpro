import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


   //(63) y (65)
   private linkThemeraul =  document.querySelector('#theme'); // con esto ya me enlaza el link


  constructor() {

    //* (63) y (65) 12.40min con esto al cargar la pagina se sigue guardaando el tema que habia cambiado o sinos por defecto pone el default-dark
    const myurlTema  = localStorage.getItem('theme') || '/assets/css/colors/default-dark.css';

    this.linkThemeraul.setAttribute('href',myurlTema);

  }

 // *(65) 6.29 min
  cambiarTema(tema:string) {

    const myurlTema = `/assets/css/colors/${tema}.css`;
    /* console.log(url); */

    // (63) finalmente cambiamos los valores en el index.html de esta forma--> el href lo sustituimos por el nuevo myurlTema
    this.linkThemeraul.setAttribute('href',myurlTema);
    localStorage.setItem('theme',myurlTema); // (63) para guardar la eleccion del tema

   /*  this.checkTemaActual(); // ()64) añadimos el tema actual aqui */


  }


}
