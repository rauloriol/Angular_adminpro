import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    // Esta funcion nos devuelve  una promesa, por tanto THEN y imprimir el resutaldo
    this.getUsuarios().then (usuariosResultado => {console.log(usuariosResultado);}) // forma (C) de hacerlo

    /* this.getUsuarios(); // FORMA (A) y (B) LLAMAMOS A LA FUNCION */

    //*(74) FORMA BASICA DE LAS PROMESAS**
    // * (74)las promesas necesitan el cuerpo que es RESOLVE, que es el cuerpo y el REJECT  es que cuando no se cumple la promesa
    /* const promesaRaul = new Promise( (resolve,reject)=>{

      if (false) {
        resolve('Cuerpo de la promesa que se llama resolve');
      } else {
        reject('Algo  mal, cuando no se cumple la promesa (reject)!!');

      }

    } );
 */
    // * (74) es la resolucion de la promesa (la parte ASINCRONA)
    /* promesaRaul.then( ()=>{
      console.log('Hey termine');
    } ); */

    //* (74) 7.04 min si quiero recibir el mensaaje que esta en el cuerpo de la promesa lo pongo
    //* Para capturar el error despues del then iria .catch y el mensaje de error
   /*  promesaRaul.then((mensajedeResolve)=>{
      console.log(mensajedeResolve);
    }).catch(error =>{
      console.log('Error en la promesa ==>',error);
    })


    console.log('Fin del init');
 */
    /*
    Para realizar tareas de manera Asincrona, de ejecutar algo despues de que alguna tarea suceda como es el caso
    de mostar el mensajes despues dle 'Fin del init'
    */

  }

  //*  (75)probamos el operativo de como FUNCIONES devuelven promesas
  getUsuarios(){

    //(75) (C) 6.42 min Tercera forma de hacerlo
    const promesaUsuarios = new Promise(  resolve => {

      // es una peticion HTTP con el fecth, luego ya con el then encarrilamos la promesa
      fetch('https://reqres.in/api/users') // (B) encadenamos dos then seguidos seria una forma de obtener bien el cuerpo dell array
      .then( respuesta=> respuesta.json()) // toma el body del array
      .then( cuerpoPromesa => resolve(cuerpoPromesa.data)); // se centra en el array de datos
    } );
    return promesaUsuarios;




    // el fetch resuelve una promesa y podemos gastar el then y el catch es de tipo http or lo que devuelve codigos 200,404 y demas
    /* fetch('https://reqres.in/api/users') // (B) encadenamos dos then seguidos seria una forma de obtener bien el cuerpo dell array
      .then( respuesta=> respuesta.json())
      .then( cuerpoPromesa => console.log(cuerpoPromesa.data)); */

       /*  respuesta.json().then(cuerpo =>{console.log(cuerpo);}) */ //(A) con .json nos devuelve otra promsea que es el cuerpo del objeto




  }





}
