import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // (162) para formularios
import { HttpClientModule } from '@angular/common/http'; // (166) Para hacer el Servicio de usuarios
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// rutas
import { AppRoutingModule } from './app-routing.module';

//modulos (28) 6.35 min
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import {ComponentsModule} from './components/components.module';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
//* esto esta en el PagesModule que en imports
/* import { DashboradComponent } from './pages/dashborad/dashborad.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component'; */

//* esto esta en el SharedModule que en imports
/* import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
 */
import { RegisterComponent } from './register/register/register.component';
import { PagesComponent } from './pages/pages.component';

// servicios
import { SharedService } from './services/shared.service';
import { SidebarService } from './services/sidebar.service';

/* //PIPES
import { ImagenPipe } from './pipes/imagen.pipe'; */
/* import { ImagenmedicoPipe } from './pipes/imagenmedico.pipe'; */
/* import { ImagenusuarioPipe } from './pipes/imagenusuario.pipe'; */






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    RegisterComponent,
    /* ImagenusuarioPipe, */
    /* ImagenPipe, */
    /* ImagenmedicoPipe, */


    /* DashboradComponent, // Componentes que estan registrados en pages.module.ts
    ProgressComponent,
    Graficas1Component, */

    /* HeaderComponent, // Componentes que estan registrados en shared.module.ts
    NopagefoundComponent,
    SidebarComponent,
    BreadcrumbsComponent, */

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule, // (28) 6.59 min importacion del modulo creado en pages para reducir el numero de importaciones en app.module.ts
    SharedModule, // (28) lo mismo que el pages module
    ComponentsModule, //(42) Lo mismo pra el components
    ReactiveFormsModule, // (162)Para formularios
    HttpClientModule,  // (166) para el servicio de usuarios
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    SharedService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
