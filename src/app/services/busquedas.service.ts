// (202) Busqueda de usuarios

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { VerUsuario } from '../interface/ver-usuario.interface';

//MODELS
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url; // Importamos el url del API


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  constructor(private http: HttpClient) { }


   // (186) Para obtener el token 7.43 min
   get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
      headers:
        {
          'x-token': this.token
        }
    }
  }

  //* 203 Transformar la respuesta para ver en vez de un objeto de tipo any, devolver un arreglo de usuarios

  private transformarRespuestaUsuario( solucion:any[] ): Usuario[]{         //203 Igual que en usuario.service -> cargar usuarios
    return solucion.map( user =>
                          new Usuario(user.nombre, user.email,'',user.img, user.google, user.role, user.uid));

  }
  // 221 Metodo para la busqueda en hospitales
  private transformarRespuestaHospital( solucion:any[] ): Hospital[]{         //203 Igual que en usuario.service -> cargar hospitales
    return solucion;

  }
  // 224 Metodo para la busqueda en medicos
  private transformarRespuestaMedico( solucion:any[] ): Medico[]{         //203 Igual que en usuario.service -> cargar medicos
    return solucion;

  }


  //* (202) Para buscar en la barra de busqueda

                                                                          // LO ESPORTAMOS A USUARIOS.COMPONENTS | MEDICOS.COPONENTE Y HOSTPITALES.COMPONENTE
  buscar(tipo:'usuarios'|'medicos'|'hospitales',terminoBusqueda:string ){

    // http://localhost:4001/api/buscador/coleccion/usuarios/terminoBusqueda
        const url = `${base_url}/buscador/coleccion/${tipo}/`+terminoBusqueda;

    /* return this.http.get(url,this.headers).pipe( map( (respuesta:any) => respuesta.resultado)); */
    return this.http.get(url,this.headers).pipe( map( (respuesta:any) => this.transformarRespuestaUsuario(respuesta.resultado)
    ));
  }

  //* 221 Metodo para la busqueda en hospitales
  buscarHospi(tipo:'usuarios'|'medicos'|'hospitales',terminoBusqueda:string ){

    // http://localhost:4001/api/buscador/coleccion/hospitales/terminoBusqueda
        const url = `${base_url}/buscador/coleccion/${tipo}/`+terminoBusqueda;

    return this.http.get(url,this.headers).pipe( map( (respuesta:any) => this.transformarRespuestaHospital(respuesta.resultado)
    ));
  }
  //* 224 Metodo para la busqueda en hospitales
  buscarMedic(tipo:'usuarios'|'medicos'|'hospitales',terminoBusqueda:string ){

    // http://localhost:4001/api/buscador/coleccion/hospitales/terminoBusqueda
        const url = `${base_url}/buscador/coleccion/${tipo}/`+terminoBusqueda;

    return this.http.get(url,this.headers).pipe( map( (respuesta:any) => this.transformarRespuestaMedico(respuesta.resultado)
    ));
  }

  //* (239) 1.04 min Metodo para busqueda general exportamos a busquedaTotal.componente.ts
  busquedaGeneral(termino:string){

    // http://localhost:4001/api/buscador/termino  ->

    const url = `${base_url}/buscador/`+termino;

    return this.http.get(url,this.headers);



  }



}
