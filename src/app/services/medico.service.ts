
// 222 Crud de medicos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//MODEL MEDICO
import { Medico } from "../models/medico.model";

//ENVIRONMENT NO-PROD
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const base_url = environment.base_url; // Importamos el url del API


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public medico:Medico;                       // Defino una propiedade de mi clase que es de Tipo Medico (model)

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


  cargarMedicos(){

   // http://localhost:4001/api/medicos/   -> Tenemos que hacer esta ruta

    const url = `${base_url}/medicos`;
      return this.http.get(url,this.headers).pipe(map((respuesta:{ok:boolean,medicos:Medico[]})=>respuesta.medicos )
      );
  }

  // (230) Obtener un medico por su ID
  obtenerMedicoPorId(id:string){

    // http://localhost:4001/api/medicos/5f4fdab598cc481e0cc23771  -> tenemos que hacer esta ruta

    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url,this.headers).pipe(map((respuesta:{ok:boolean,medico:Medico})=>respuesta.medico )
      );
  }


  //* 223 Crear un medico
  crearMedico(medico:{nombre:string,hospital:string}){

    // http://localhost:4001/api/medicos/  --> 3.46min  debemos enviar el objeto medico
    const url =`${base_url}/medicos`;
    return this.http.post(url,medico,this.headers);

  }
  /* crearMedico(medico:Medico){

    // http://localhost:4001/api/medicos/  --> 3.46min  debemos enviar el objeto medico
    const url =`${base_url}/medicos`;
    return this.http.post(url,medico,this.headers);

  } */

  //* 223 4.10min  Actualizar un medico
  actualizarMedico( medico:Medico ){

    // http://localhost:4001/api/medicos/medico._id
    const url =`${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico,this.headers);

  }
  //* 223 4.19min  Borrar un medico
  eliminarMedico( medico:Medico){

    // http://localhost:4001/api/medicos/medico._id
    const url =`${base_url}/medicos/${medico._id}`;
    return this.http.delete(url,this.headers);

  }



}
