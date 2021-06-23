
// (28) 2.44 min creacion de este modulo para no sobrecargar el app.module.ts

import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//(41) importamos para el ngModel 9.26 min
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // (186) Tambien sirve aqui

//(42) componente ajeno que hay que importar en el pages module
import {IncrementadorComponent } from '../components/incrementador/incrementador.component';


//(54) componente ajeno que hay que importar en el pages module
import { DonutComponent  } from '../components/donut/donut.component';
//(54) importacion de ng2 charts
import { ChartsModule } from 'ng2-charts';
import { AjustescuentaComponent } from './ajustescuenta/ajustescuenta.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsraulComponent } from './rxjsraul/rxjsraul.component';
import { PerfilComponent } from './perfil/perfil.component';

import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { ModalimagenComponent } from './modalimagen/modalimagen.component';


//PIPES
import { ImagenPipe } from '../pipes/imagen.pipe';
import { ImagenmedicoPipe } from '../pipes/imagenmedico.pipe';
import { ImagenusuarioPipe } from '../pipes/imagenusuario.pipe';
import { BusquedatotalComponent } from './busquedatotal/busquedatotal.component';





@NgModule({

  declarations:[

    DashboradComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    DonutComponent,
    AjustescuentaComponent,
    PromesasComponent,
    RxjsraulComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    ImagenPipe,
    ImagenmedicoPipe,
    ImagenusuarioPipe,
    MedicoComponent,
    BusquedatotalComponent,
    ModalimagenComponent



  ],
  exports:[

    DashboradComponent, // se ponen aqui tambien por que estos componentes se exportaran a mas lugares de la pagina web
    ProgressComponent,
    Graficas1Component,

    AjustescuentaComponent, // (62) se ponen aqui tambien por que estos componentes se exportaran a mas lugares de la pagina web
    ImagenPipe,
    ImagenmedicoPipe,
    ImagenusuarioPipe,
    ModalimagenComponent


  ],
  imports:[

    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    RouterModule,


  ]


})

export class PagesModule {}
