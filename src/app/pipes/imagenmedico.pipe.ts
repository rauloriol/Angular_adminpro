import { Pipe, PipeTransform } from '@angular/core';

// importamos los enviroments de
import { environment } from '../../environments/environment'; // para coger la URl del api

const base_url = environment.base_url;

@Pipe({
  name: 'imagenmedico'
})
export class ImagenmedicoPipe implements PipeTransform {

  transform(img: string, tipo:'medicos' ): string {


    if(!img){                                      // foto por defecto
      return `${base_url}/upload/usuarios/nofoto.png`;
    }
    else if (img.includes('https')) {
      return img;
    }
    else if (img) {
      return `${base_url}/upload/medicos/${img}`;         //Validacion si hay foto esta en la ruta siguiente
    }
    else{
      return `${base_url}/upload/medicos/nofoto.png`;
    }

}
}
