
//* (166) 5.48 min
// LAS inferfaces sirven para que un objeto tenga cierta forma

// Esta interfaz servira para decirle al servicio de usuario.service.ts de que tipo es el formData =)

export interface FormularioRegistro {

  nombre: string;
  email: string;
  password: string;
  password2: string;
  terminos: boolean;
}
