import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms'; // (162) 2.58 min para formularios y los validadores
import { UsuarioService } from '../../services/usuario.service'; // (166)3.54 min importado y en el constructor

import Swal from 'sweetalert2'; // (167) Instalacion de sweetAlert para los usuarios

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // (21) 9.08 min creamos un nuevo archivo css
                                          // y le importamos el css llamaodo login-register-lock-css
})
export class RegisterComponent  {

  public formularioPosteado = false;


  // DEFINIMOS CADA UNO DE LOS CAMPOS DEL FORMULARIO CON formbuilder.group
  public formularioRegistro = this.fb.group({

    nombre: ['',
        [
          Validators.required,
          Validators.minLength(3),
        ]
    ],

    email: ['',
          [
          Validators.required,
          Validators.email
          ],
    ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router:Router ) { }

  crearUsuario(){
    this.formularioPosteado = true;
    /* console.log(this.formularioRegistro.value); // imprimir los valores del formulario */

    if (this.formularioRegistro.invalid) {
      return;
  }
  // (166) HACER EL POSTEO A LA BD Utilizando el Servicio
    this.usuarioService.crearUsuario(this.formularioRegistro.value)   // envio todos los datos del formulario
                        .subscribe(respuesta => {                     // (166) 9.49 MIN  me suscribo al OBSERVABLE DE LA PETICION
                        /* console.log('Usuario Creado');
                        console.log(respuesta); */
                         // (174) 12.45 min Navegar al Dashboard
                        this.router.navigateByUrl('/dashboard');
                        }, (err) => {
                                      Swal.fire({                   // (167) Si hay usuario repetido que salte el error
                                      title: 'Error!',
                                      text: err.error.msg,
                                      icon: 'error',
                                      confirmButtonText: 'Ok'
                                              });
                        });

}



  campoNoValido(campo: string): boolean{
    if (this.formularioRegistro.get(campo).invalid && this.formularioPosteado) {
      return true; // campo no es valid mostrará el mensaje de erro
    }
    else{
      return false; // No muestra el mensaje de error
    }
  }




// (164)  Metodo para validacion de contraseñas en el mensaje del HTML
  constrasenasNovalidas(){

    const pass1 = this.formularioRegistro.get('password').value; // valor que tomamos del formulario escrito
    const pass2 = this.formularioRegistro.get('password2').value; // valor que tomamos del formulario escrito

    if (pass1 !== pass2  && this.formularioPosteado) {
      return true; // MUESTRA mensaje de error
    }
    else{
      return false; // NO se muestra el mensaje, todo esta OK!
    }
  }
  // (164) 4.26 min para ponerlo en los validadores del component.ts
  passwordsIguales(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        // Si son iguales no hay error
        pass2Control.setErrors(null);

      }else{
        pass2Control.setErrors({noesIgual: true});
      }
    };


  }


  // (163) SI esto esta en falso que muestre el error
  aceptarTerminos(){
    return !this.formularioRegistro.get('terminos').value && this.formularioPosteado;
  }


}
