import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

// tslint:disable-next-line: max-line-length
import { FormularioRegistro } from '../interface/formulario-registro.interface'; // (166) 6.35 min importamos de interface_> formulario-registro
import { FormularioLogin } from '../interface/formulario-login.interface';      // (168) importamos de interface_> formulario-registro

// IMPORTAMOS EL RXJS PARA LOS OPERADORES DE LOS OBSERVABLES // TAP 1.21 MIN DISPARA UN EFECTO SECUNDARIO
import {map, tap, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';                                // (182) Se importa desde el model
import { CargarUsuario } from '../interface/cargar-usuarios.interface';           //  (198) Creacion de interfaz

const base_url = environment.base_url; // Importamos el url del API

declare const gapi:any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: Usuario // (182) Defino una propiedade de mi clase que es de Tipo Usuario (model)

  public auth2:any;

  constructor( private http: HttpClient, private router:Router, private ngZone: NgZone) {

    this.googleInit();

  }


  //*(174) Necesitamos verificar el token, cada vez que entro al dashboard tengo q verificar el token
  // es la funcion del backEnd RENOVAR LOGIN USUARIOS (renovar token) --> funcion GET

  validarToken():Observable<boolean>{ // (174) inyectamos el servicio en auth.guard.ts

    const token = localStorage.getItem('token') || '';

    return  this.http.get(`${base_url}/login/renovarlogin`,{
        headers:
        {
          'x-token': token
        }
      }).pipe(
        map((resp:any)=>{                                                     // con el map transformaos en true o false, si existe es true, si no existe sera false

        const {email,google,img,nombre,rol,uid} = resp.usuario;               // (182) 8.13 min  desestructuramos la respuesta de la api y instanciamos el usuario

        this.usuario = new Usuario( nombre,email,'',img,google,rol,uid);
        localStorage.setItem( 'token', resp.token);                           // (174) 8.04 min renovarmos el token
        localStorage.setItem('menu',JSON.stringify(resp.menu) );              // (241) para que se guarde en el localStorage, lo combertimos a string con el metodo
        return true;
      }),
      catchError(error => of(false))  // para gestionar el error de la ruta y con OF (importamos un observable con valor que pongamos dentro)
      );
  }

  //* (169) SOn observables porl que a parte del suscribe se le pueden encadenar operadores como pipe,map filter...
  crearUsuario(formData: FormularioRegistro) { // (166) 3.07 min Metodo para crear USUARIO

                                                              //Hacemos la peticion http a la API QUE TENEMOS EN EL BACKEND ponemos el tipo
    return  this.http.post(`${base_url}/usuarios`, formData) // Nos da un OBRSERVABLE que nos tenemos que suscribir
                                                              // La funcion que nos introduce los datos del formulario al BackEnd
                                              .pipe(tap((resp: any) => {
                                              console.log(resp);
                                              localStorage.setItem( 'token', resp.token);
                                              localStorage.setItem('menu',JSON.stringify(resp.menu) );      // (241) para que se guarde en el localStorage, lo combertimos a string con el metodo
                                              }));                                                        // tap recibe lo que responde la peticion post
  }


  // (186) Para obtener el token 7.43 min
  get token(): string{
    return localStorage.getItem('token') || '';
  }
  // (186) Para obtener el UID del usuario y poerlo en actualizar perfil

  get headers(){
    return{
      headers:
        {
          'x-token': this.token
        }
    }
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get rol(): 'ADMIN_ROLE'| 'USER_ROLE'{
    return this.usuario.role;
  }

  // (186) Actualizar Perfil de Usuario por lo que sera una peticion put
  // exportamos este metodo mediante usuario service al perfil.componentes.ts
  actuarlizarPerfil( datos:{ email:string, nombre:string, rol:string }){


    datos={                           // desestructuramos para obtener el rol de los datos
      ...datos,
      rol:this.usuario.role
    }

   return this.http.put(`${base_url}/usuarios/${this.uid}`,datos,{
      headers:{
        'x-token': this.token // sacado del get token de arriba
      }
   });

  }


  loginUsuario(formData: FormularioLogin) { // (168) 6.39 min Metodo para logear USUARIO

                                                              // Hacemos la peticion http a la API QUE TENEMOS EN EL BACKEND ponemos el tipo
                                                              // Nos da un OBRSERVABLE que nos tenemos que suscribir
                                                              // La funcion que nos introduce los datos del formulario al BackEnd
  return  this.http.post(`${base_url}/login`, formData)
                          .pipe(tap((resp: any) => {
                            /* console.log(resp); */
                            localStorage.setItem( 'token', resp.token);
                            localStorage.setItem('menu',JSON.stringify(resp.menu) ); // (241) para que se guarde en el localStorage, lo combertimos a string con el metodo
                          }));                                                       // tap recibe lo que responde la peticion post

  }

  // (173) 5.49 min Creacion del login de Google para entrar en al aplicacion
  loginGoogle(token) { // (168) 6.39 min Metodo para logear USUARIO

  return  this.http.post(`${base_url}/login/google`,{token})
                          .pipe(tap((resp: any) => {
                            /* console.log(resp); */
                            localStorage.setItem( 'token', resp.token);
                            localStorage.setItem('menu',JSON.stringify(resp.menu) );  // (241) para que se guarde en el localStorage, lo combertimos a string con el metodo
                          }));                                                        // tap recibe lo que responde la peticion post

  }

  // (175) Metodo para salir de la aplicacion y borrar los token del Local Storage del navegador
  logout(){
    localStorage.removeItem('token');
    /* this.router.navigateByUrl('/login'); */


    localStorage.removeItem('menu');                    // (241) para que se borre del localStorage al salir

    // para deslogin de google
    this.auth2.signOut().then(()=>{

      this.ngZone.run(()=>{ // (175) para volver a cargar el boton de login de google
        this.router.navigateByUrl('/login');
      });

      console.log('Usuario signed out!')
    });

  }

  //(175) Para desloguearse de google cuando salimos
  googleInit(){
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '781936843883-p2e083iha7iooj0gu61vrj5n4c5ug8o2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',

      });

    });
  }

  //* (198) Para ver los usuarios en la tabla de front end (verUsuarios) en el API POStMAN

  cargarUsuarios( desde: number = 0){

    // http://localhost:4001/api/usuarios?desde=0    -> Tenemos que hacer esta ruta

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url,this.headers).           // (198) 4.30 min lo exportamos a usuarios.component.ts en forma de servicio
             pipe(
               map((respuesta)=>{

                /* console.log(respuesta); */                        // Necesito cambiar el arreglo de objetos por arreglo de tipo usuarios
                const usuarios = respuesta.usuarios.map(user =>
                  new Usuario(user.nombre, user.email,'',user.img, user.google, user.role, user.uid)
                )

                return{
                  totalUsuarios: respuesta.totalUsuarios,
                  usuarios
                }
              })

             );

  }

  //* 204 7.00 min Borrar los Usuarios de la bd

  borrarUsuarios(usuario:Usuario){

    // http://localhost:4001/api/usuarios/5f312a0697697c1090bb5a98
        const url = `${base_url}/usuarios/`+usuario.uid;
        return this.http.delete(url,this.headers);


  }

}
