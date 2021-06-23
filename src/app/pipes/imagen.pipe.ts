// (218)  Creacion de un pipe para que nos devuelva la imagen

import { Pipe, PipeTransform } from '@angular/core';

// importamos los enviroments de
import { environment } from '../../environments/environment'; // para coger la URl del api

const base_url = environment.base_url;



// EL PIPE SE EXPORTA O SE LLAMA EN EL HTML CON EL NOMBRE  | imagen
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:'hospitales' ): string {



    if(!img){                                      // foto por defecto
      return `${base_url}/upload/usuarios/nofoto.png`;
    }
    else if (img.includes('https')) {
      return img;
    }
    else if (img) {
      return `${base_url}/upload/hospitales/${img}`;         //Validacion si hay foto esta en la ruta siguiente
    }
    else{
      return `${base_url}/upload/hospitales/nofoto.png`;
    }






  }

}
