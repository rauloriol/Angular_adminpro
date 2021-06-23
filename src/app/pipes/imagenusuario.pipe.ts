

import { Pipe, PipeTransform } from '@angular/core';

// importamos los enviroments de
import { environment } from '../../environments/environment'; // para coger la URl del api

const base_url = environment.base_url;


@Pipe({
  name: 'imagenusuario'
})
export class ImagenusuarioPipe implements PipeTransform {

  transform(img: string, tipo:'usuarios' ): string {


    if(!img){                                      // foto por defecto
      return `${base_url}/upload/usuarios/nofoto.png`;
    }
    else if (img.includes('https')) {
      return img;
    }
    else if (img) {
      return `${base_url}/upload/usuarios/${img}`;         //Validacion si hay foto esta en la ruta siguiente
    }
    else{
      return `${base_url}/upload/usuarios/nofoto.png`;
    }

  }

}
