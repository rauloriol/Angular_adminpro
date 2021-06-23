
// (216) 3,30 min  Modelo de hospital


  interface _hospitalUser{
    _id: string,
    nombre: string,
    email: string,
    img: string

  }


export class Hospital{

  constructor(

    public nombre:string,
    public img?:string,
    public hospitalId?:string,
    public _id= hospitalId,
    public usuario?:_hospitalUser,

  ){}
}
