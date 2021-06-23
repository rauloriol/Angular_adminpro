import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';    // (174) con el authguard esta progetido
import { AdminGuard } from './guards/admin.guard';  // (242) con el admin solo los admin pueden ver la ruta

//Componentes (19)
import { DashboradComponent } from './pages/dashborad/dashborad.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component'; // (clase 21 ) tarea practica 2
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PagesComponent } from './pages/pages.component';
import { AjustescuentaComponent } from './pages/ajustescuenta/ajustescuenta.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsraulComponent } from './pages/rxjsraul/rxjsraul.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

// (197) Mantenimiento
import { UsuariosComponent } from './pages/mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './pages/mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './pages/mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './pages/mantenimiento/medicos/medico.component';
import { BusquedatotalComponent } from './pages/busquedatotal/busquedatotal.component';


const routes: Routes = [

  {   path: '',  // la ruta vacia va a redireccionar a page component (dashboard ==  home) que tiene estos hijos
      component:PagesComponent, // (20) 5.01 min son las rutas que trabajaran con el router outlet secundario
      canActivate:[AuthGuard],   // (174) con el authguard esta progetido la rutas children
      children: [
        // tslint:disable-next-line: comment-format
        //(84) añadimos a las rutas la (data) que es un objeto que podemos poer lo que queramos
        {path: 'ajustescuenta',component:AjustescuentaComponent,data:{titulo:'Ajustes de Cuenta'}},
        {path: 'dashboard',component:DashboradComponent,data:{titulo:'Dashboard'}},
        {path: 'buscar/:termino',component:BusquedatotalComponent,data:{titulo:'Busquedas'}},
        {path: 'graficas1',component:Graficas1Component,data:{titulo:'Gráficas'}},
        {path: 'progress',component:ProgressComponent,data:{titulo:'Progreso'}},
        {path: 'perfil',component:PerfilComponent,data:{titulo:'Perfil de Usuario'}},
        {path: 'promesas',canActivate:[AdminGuard],component:PromesasComponent,data:{titulo:'Ejemplo promesas'}},   // (242) le coloco el ADMINGUARD que es ruta de admin
        {path: 'rxjs',canActivate:[AdminGuard],component:RxjsraulComponent,data:{titulo:'Programacion Reactiva'}},  // (242) le coloco el ADMINGUARD que es ruta de admin

        //* (197) 1.46 MIN MANTENIMIENTO
        {path: 'usuarios',canActivate:[AdminGuard],component:UsuariosComponent,data:{titulo:'Usuario de aplicación'}},  // (242) le coloco el ADMINGUARD que es ruta de admin
        {path: 'hospitales',component:HospitalesComponent,data:{titulo:'Hospital de aplicación'}},
        {path: 'medicos',component:MedicosComponent,data:{titulo:'Medicos de la aplicación'}},
        {path: 'medico/:id',component:MedicoComponent,data:{titulo:'Medico de la aplicación'}},  // (222) 5.23 min para editar un medico

        {path: '', redirectTo: '/dashboard',pathMatch:'full'} // si el path esta vacio redirecciona al dashboard (home)
      ]
  }, // (20) 3.35 min para que me lleve al pages component

        {path: 'login',component:LoginComponent,data:{titulo:'login'}},
        {path: 'register',component:RegisterComponent,data:{titulo:'Register'}}, // (clase 21 ) tarea practica 2

        {path: '**',component:NopagefoundComponent} // cualquier otra cosa que no sean las rutas de arriba que lleve al componenten que no hay nada

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})], // utilizamos el hash (19) 5.31 min [ http://localhost:4200/#/dashboard ]
  exports: [RouterModule]
})
export class AppRoutingModule { }
