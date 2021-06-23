import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model'; // (183) importamos usuario model
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario:Usuario; // (183) importamos el model para tener sus propiedades

  constructor(private usuarioService:UsuarioService,
              private buscarServicio:BusquedasService,
              private router:Router) {

    this.usuario=usuarioService.usuario; // (183) tenemos todos los metodos y propiedades del modelo usuario


  }

  logout(){
    this.usuarioService.logout();
  }



  busquedaGeneral(termino:string){
                                    /* console.log(termino) */
    if (termino.length===0) {       // si no se escribe nada y se da intro que no haga nada
      return;

    }else{
      this.router.navigateByUrl('/buscar/'+termino);
    }

    /* this.buscarServicio.busquedaGeneral(termino).subscribe(); */
  }


}
