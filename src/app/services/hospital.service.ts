// 216 Creacion del servicio de hospital


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//MODELO HOSPITAL
import { Hospital } from '../models/hospital.model';

//ENVIRONMENT NO-PROD
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';

const base_url = environment.base_url; // Importamos el url del API


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

      public hospital:Hospital                                       // Defino una propiedade de mi clase que es de Tipo Hospital (model)



  constructor(private http: HttpClient) { }


        //* (186) Para obtener el TOKEN
        get token(): string{
          return localStorage.getItem('token') || '';
        }
        //* (186) Para obtener los HEADERS
        get headers(){
          return{
            headers:
              {
                'x-token': this.token
              }
          }
        }

    cargarHospitales(){
      // http://localhost:4001/api/hospitales/    -> Tenemos que hacer esta ruta
                                                   // (216) 4.30 min lo exportamos a hospitales.component.ts en forma de servicio
      const url = `${base_url}/hospitales`;
      return this.http.get(url,this.headers).pipe(map((respuesta:{ok:boolean,hospitales:Hospital[]})=>respuesta.hospitales )
      );
    }

    //* 219 Crear un hospital
    crearHospital(nombre:string){

      // http://localhost:4001/api/hospitales/
      const url =`${base_url}/hospitales`;
      return this.http.post(url,{nombre},this.headers);

    }
    //* 219 Actualizar un hospital
    actualizarHospital( hospitalId:string,nombre:string, ){

      // http://localhost:4001/api/hospitales/hospitalId
      const url =`${base_url}/hospitales/`+hospitalId;
      return this.http.put(url,{nombre},this.headers);

    }
    //* 219 Borrar un hospital
    eliminarHospital( hospitalId:string){

      // http://localhost:4001/api/hospitales/hospitalId
      const url =`${base_url}/hospitales/`+hospitalId;
      return this.http.delete(url,this.headers);

    }




}
