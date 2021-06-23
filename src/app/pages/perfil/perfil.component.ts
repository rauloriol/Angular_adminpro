import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//MODEL USUARIO
import { Usuario } from 'src/app/models/usuario.model';                     // (187) Importacion del modelo usuario

// SERVICIOS
import { FileUploadService } from 'src/app/services/file-upload.service';  //(188) importar el servicio de uploap cosas
import { UsuarioService } from 'src/app/services/usuario.service';         //(186) importacion para hacer uso del service

// MENSAJE NOTIFICACIONES
import Swal from 'sweetalert2';                                            // (168) Instalacion de sweetAlert para los usuarios

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'

})
export class PerfilComponent implements OnInit {


  public perfilFormulario:FormGroup;                  // (186) Creacion del formulario necesario el [formgroup] y el [formbuilder]
  public usuario: Usuario;                            // (187) Importacion del modelo usuario
  public imagenSubir: File;                            // (188) Importacion del modelo FIle propio de angular


  constructor( private formBuilder:FormBuilder, private usuarioService:UsuarioService, private fileuploadService:FileUploadService ) {

    this.usuario = usuarioService.usuario;            // (187) Aqui esta toda la info del usuario

  }

  ngOnInit(): void {

    //* Este formulario lo exportamos al html mediante [formGroup]="perfilFormulario"
    //* y en los inputs poner FormControlName="email" FormControlName="nombre"
     this.perfilFormulario = this.formBuilder.group({

      nombre:[this.usuario.nombre , Validators.required],
      email:[this.usuario.email, [Validators.email,Validators.required]]

    });

  }


  // Metodo para actualizar el perfil que se exporta en el html debajo del [formGroup]="perfilFormulario" como (submit)="actualizarPerfil()"
  actualizarPerfil(){

    /* console.log(this.perfilFormulario.value); */
    this.usuarioService.actuarlizarPerfil(this.perfilFormulario.value)  // en perfil.value estan los datos introducidos de nombre y email
              .subscribe(()=>{

                const {nombre , email} = this.perfilFormulario.value;  //* (187) Tomamos lo escrito en el formulario
                this.usuario.nombre = nombre;                          // definimos usuario.nombre como el nombre que hemos puesto en el formulario
                this.usuario.email = email;                           // definimos usuario.email como el email que hemos puesto en el formulario
                console.log('User Updated!');

                Swal.fire({
                  title: 'Actualizado',
                  text: `${nombre}`,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                          });
              }),
              (err)=>{
                Swal.fire({
                  title: 'Error',
                  text: err.error.msg,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                          });
              }
  }



  //* (188) 7.51 minACTUALIZAR IMAGEN
  // En el html imput se coloca (change)="cambiarImagen($event)"
  cambiarImagen(file:File){

      this.imagenSubir=file;

  }

  subirImagen(){
    this.fileuploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
            .then( img => {this.usuario.img = img;

              Swal.fire({
                title: 'Actualizado',
                text: 'Imagen actualizada',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            })     // Se define la imagen del usuario como la imagen que acabamos de poner

            .catch(err => {
              console.log(err);
              Swal.fire({
                title: 'Error',
                text: 'Error imagen no Actualizada',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            })
  }

}
