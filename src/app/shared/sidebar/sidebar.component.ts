import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model'; //(183) importamso el modelo

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  /* public menuItems:any[]; */
  public usuario:Usuario // (183) importamos el model

  //(67) inyectamos el servicio en el componente
  constructor(public _siderbarService:SidebarService,
              private usuarioService:UsuarioService ) {

    /* this.menuItems = _siderbarService.menu; */
   /*  console.log(this.menuItems); */

   this.usuario=usuarioService.usuario; // (183) tenemos todos los metodos y propiedades del modelo usuario


  }

  ngOnInit(): void {
  }

}
