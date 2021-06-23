
//* (168) 5.48 min
// LAS inferfaces sirven para que un objeto tenga cierta forma

// Esta interfaz servira para decirle al servicio de usuario.service.ts de que tipo es el formData =)

export interface FormularioLogin {

  email: string;
  password: string;
  remember: boolean;
}
