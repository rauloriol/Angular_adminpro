
  // (242) Una  Validacion para el admin para que alguien que no sea admin prueda entrar a esa ruta de users por ejempo

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// SERVICIO
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {



  constructor( private usuarioService:UsuarioService,
               private router:Router){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // En ternaria (condicion)? verdad [if]: falso [else]
      /* return (this.usuarioService.rol==='ADMIN_ROLE')? true : false; */   // Lo exportamos a app-routing.module.ts

      // OTRA FORMA DE PONERLO
       if (this.usuarioService.rol==='ADMIN_ROLE') {
        return true
      }
      else{
        this.router.navigateByUrl('/login');   // si no esta logeado como admin y entra en ruta protegida sacarlo al login
        return false;
      }


  }

}
