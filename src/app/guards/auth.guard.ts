import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

// (174) Proteger las rutas, para que solo si estas registrado con el token puedas acceder a rutas  -->  ng g guard guards/auth
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private usuarioService:UsuarioService,
                private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)  {
                                                // (174) YA nos devuelve un true o false definido en usuario service
      return this.usuarioService.validarToken().pipe(tap(estaLogueado=>{

        if (!estaLogueado) {
          this.router.navigateByUrl('/login'); // si no esta logueado lo envio a la pantalla de login
        }
      }));
  }

}
