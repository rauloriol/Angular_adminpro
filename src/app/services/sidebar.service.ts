import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  // (241) 6.05 min

  public menu = [];                                    //* lo tenemos que exportar como servicio en pages.component.ts

  cargarMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu')) || [];    // (241) 6.42 min como es un string, se utiliza el metodo parse
                                                                    // en caso de no existir el menu que regrese arreglo vacio

  }





























  // ================================ MENU ANTIGUO, AHORA SE CARGA DESDE EL BACK-END ===================================>

  //(67) Menu del dashboard que nos lleve a las diferentes rutas y lo inyectamos en el sidebar.componente.ts

  // con esta opcion puedo añadir tantos submenus como quiera en el sidebar
  /* menu:any[]=[

    {
      titulo:'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:
      [
        {titulo:'Menu',url:'/'},
        {titulo:'Barra Progreso',url:'/progress'},
        {titulo:'Gráficas',url:'/graficas1'},
        {titulo:'Promesas',url:'/promesas'}, //(74) 3.11 min
        {titulo:'RXJS',url:'/rxjs'} //(76) 3.11 min
      ]

     },

     //(196) Creacion de un nuevo submenu en el sidebar
    {
      titulo:'Mantenimiento',
      icono:'mdi mdi-folder-lock-open',
      submenu:
      [
        {titulo:'Usuarios',url:'/usuarios'},
        {titulo:'Hospitales',url:'/hospitales'},
        {titulo:'Médicos',url:'/medicos'},

      ]

     },

  ];
  */

}
