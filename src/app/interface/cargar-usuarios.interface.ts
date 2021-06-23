
// *(198) 7.36 MIN  PARA DEFINIR EL TIPO DE DATOS QUE DEVUELE EL SUBSCRIBE

import { Usuario } from '../models/usuario.model';

export interface CargarUsuario{

  totalUsuarios:number,
  usuarios:Usuario[]

}

// lo exportamos al servicio usuario.service.ts en metodo cargarUsuarios
