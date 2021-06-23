
// (222) 3,30 min  Modelo de medico

import { Hospital } from './hospital.model';


    interface _medicoUser{
      _id: string,
      nombre: string,
      email: string,
      img: string

    }
    /* interface _medicoHospital{
      _id: string,
      nombre: string,

    } */


export class Medico{

constructor(

  public nombre:string,
  public img?:string,
  public _id?:string,
  public usuario?:_medicoUser,
  public hospital?:Hospital,  // 3.40 min importamos el modelo de hospital que ya esta definido

){}
}
