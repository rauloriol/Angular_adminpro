
// importamos los enviroments de
import { environment } from '../../environments/environment'; // para coger la URl del api

const base_url = environment.base_url;


// Clase (161) deficion de USUario modelo
export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public google?: string,
    public role?: 'ADMIN_ROLE'| 'USER_ROLE',
    public uid?: string,
  ){}

  // (183) Ver la imagen del perfil--> lo exportamos en shared/header
  get imagenUrl(){

    // upload/usuarios/nofoto


    if(!this.img){                                      // foto por defecto
      return `${base_url}/upload/usuarios/nofoto.png`;
    }
    else if (this.img.includes('https')) {
      return this.img;
    }
    else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;         //Validacion si hay foto esta en la ruta siguiente
    }
    else{
      return `${base_url}/upload/usuarios/nofoto.png`;
    }

  }
}
