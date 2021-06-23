import { Component,OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';       // (168) Imporataciones necesarias
import { UsuarioService } from '../services/usuario.service';   // (168)importado y en el constructor

import Swal from 'sweetalert2'; // (168) Instalacion de sweetAlert para los usuarios

declare const gapi:any; // /(172) declaramos una constante

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // (20) 9.08 min creamos un nuevo archivo css y le importamos el css llamaodo login-register-lock-css
})
export class LoginComponent implements OnInit  {


  // (168) Login de usuario normal

  public formularioPosteado = false;
  public auth2:any; //(173) // contendra la info del token y de google


  // DEFINIMOS CADA UNO DE LOS CAMPOS DEL FORMULARIO Login CON formbuilder.group
  public formularioLogin = this.formBuilder.group({

    email: [localStorage.getItem('email') || '', // (170) coloca el email ya guardado
          [
            Validators.required,
            Validators.email]
          ],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  // Se renderiza el boton de google
  ngOnInit(): void {
    this.renderButton();
  }


  login(){

    // (168) HACER EL LOGIN A LA BD Utilizando el Servicio DEL USUARIO
    this.usuarioService.loginUsuario(this.formularioLogin.value)
      .subscribe(respuesta => {

      /* console.log(respuesta); */
        if (this.formularioLogin.get('remember').value) {
          localStorage.setItem('email',this.formularioLogin.get('email').value); // (170) clica en remermber me
        }
        else{
          localStorage.removeItem('email');  // (170) sin no quiere darle a recordar
        }

        // (174) 12.45 min Navegar al Dashboard
        this.router.navigateByUrl('/dashboard');

    }, (err) => {
      Swal.fire({                   // (168) Si el correo o contraseña no son correctas sale el mensaje del backend de fallo
        title: 'Error',
        text: 'Correo/Contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok'
                });
    });

  }
  // copiado de la documentacion de google  https://developers.google.com/identity/sign-in/web/build-button

  // (173) NUEVA FORMA DE HACERLO EN
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 150,
      'height': 35,
      'longtitle': false,
      'theme': 'dark',
    });

    this.startApp(); // Al click en el boton se inicia el login
  }

   startApp() {
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '781936843883-p2e083iha7iooj0gu61vrj5n4c5ug8o2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',

      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

   attachSignin(element) {
    /* console.log(element.id); */
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token).subscribe(resp =>{

              // (174) 12.45 min Navegar al Dashboard
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/dashboard');
              });


          });
          /* console.log(id_token); */

        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
