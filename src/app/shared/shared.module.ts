
// (28) 2.44 min creacion de este modulo para no sobrecargar el app.module.ts

import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';                         //(66) importacion pora las  rutas
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';                             // (237) Importacion manejo de formularios

import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';




@NgModule({

  declarations:[

    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    BreadcrumbsComponent,



  ],
  exports:[

    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    BreadcrumbsComponent,


  ],
  imports:[
    RouterModule, // (66) importamos el rotutermodule para las rutas con el rotuterlink del sidebar y demas
    BrowserModule,
    FormsModule
  ]


})

export class SharedModule {}
