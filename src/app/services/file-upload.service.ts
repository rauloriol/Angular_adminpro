//*(188)  Para subir archivos

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;                        // Importamos el url del API



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private http: HttpClient) { }


  //* METODO PARA ACTUALIZAR FOTOS es asincrono y utilizo tb el try cath
  // 6.42 min lo tengo que importar donde tenga el metodo
  async actualizarFoto(
                        archivoParaSubir : File,                        // 3.20 min NECESITO LOS ARGUMENTOS PARA ACTUALIZAR UNA FOTOGRAFÍA
                        tipo: 'usuarios' | 'medicos'| 'hospitales',
                        id:string
                      ){


    try {

      const url=`${base_url}/upload/${tipo}/${id}`                      // 4.10 min NECESITO el Url donde apuntar

      const datosFormulario = new FormData();                           // Toma los datos del formulario
            datosFormulario.append('imagen',archivoParaSubir);          // En el backend la propiedad del body  se llama imagen

      const respuesta = await fetch(url,{                               // fech -> hacer peticiones http de forma facil, pongo el url

        method:'PUT',                                                   // y las propiedades que el fetch va a tener
        headers:{
          'x-token':localStorage.getItem('token') || ''
        },
        body:datosFormulario
      });
      const datos = await respuesta.json();

        // (189) VALIDACION PARA OBTENER LA IMAGIEN
        if(datos.ok){
          return datos.identificador;                                     // Devuelve un string con el nombre del archivo o
        }
        else{
          console.log(datos.msg);                                        // Devuelve un mensaje de error
          return false;
        }

    }
     catch (error) {
      console.log('Error al subir el archivo --> '+error);
      return false;

    }


  }


}
