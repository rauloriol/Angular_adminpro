import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

//MODELO
import { Usuario } from '../../../models/usuario.model';
//SERVICIOS
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

//SWEETALERT
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {




  public totalUsers:number=0;        // (198) 5.53 min Extraemos dos propiedades el total de usuarios visto en el console.log(respuesta)
  public users:Usuario[]=[];         // (198) 5.53 min Extraemos dos propiedades un array de objetos de usuarios esta vacio
  public usersTemp:Usuario[]=[];     // (203) 1.39 min Guarda los usuarios de forma temporal
  public desde: number=0;             //(199) Paginar los usuarios
  public cargando:boolean=true;

  constructor( private usuarioServicio:UsuarioService, private busquedaServicio:BusquedasService, private modalService:ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.modalService.imagenActualizadaEmiter
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarUsuarios()) // nos subscribimos al evente y nos carga los usuaarios

  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioServicio.cargarUsuarios(this.desde)
    .subscribe((respuesta)=>{
    /* console.log(respuesta); */

        this.totalUsers=respuesta.totalUsuarios;        // 8.56 min lo exportamos al html
        this.users=respuesta.usuarios;               // 8.56 min lo exportamos el html en <tr mediante ngFor="let usuario of users"
        this.usersTemp=respuesta.usuarios;
        this.cargando=false;

      });

  }


  cambiarPagina(valor:number){                             // exportamos este metodo al html con ngClick="cambiarPagina()"

    /* this.desde = this.desde + valor; */
    this.desde += valor;

    if (this.desde <0 ) {
      this.desde=0;
    }
    else if (this.desde>this.totalUsers) {
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscarUsuarios(termino:string){

                                                             // (203)validacion cuando la barra de busqueda esta vacia para que muestre los ulitmos buscados
    if (termino.length===0) {
       return this.users = this.usersTemp;
    }
    /* console.log(termino); */
    this.busquedaServicio.buscar('usuarios',termino).subscribe((respuesta:any)=>{
              /* console.log(respuesta); */
              this.users=respuesta})
  }

  //* 204 Borrado de usuarios, se exporta al html mediante (click)
  eliminarUsuario(usuario:Usuario){
                                                    // (205) Para no borrarnos a nostros mismos
    if (usuario.uid=== this.usuarioServicio.uid) {

      return  Swal.fire({
        title: 'Error' ,
        text: `No puedes borrar a ti mismo`,
        icon: 'error'
      })
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Quieres borrar a [${usuario.nombre}]`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar Usuario'
    }).then((result) => {
      if (result.value) {

        this.usuarioServicio.borrarUsuarios(usuario).subscribe(respuesta=>{

          this.cargarUsuarios();
          Swal.fire(
          'Eliminado!',
          `[${usuario.nombre}] borrado correctamente`,
          'success'
        )})

      }
    })
  }

  //* (208) Abrir modal de imagen
  abrirModal(usuario:Usuario){                         // lo exportamos al html en <img [src]="usuario.imagenUrl" alt="Avatar de usuario" class="ancho50">
    this.modalService.mostrarModal('usuarios',usuario.uid,usuario.img);
  }

}
