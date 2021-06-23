import { Component, OnInit } from '@angular/core';

//SERVICIOS
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
                                                              //(65) hago la inyeccion de mi servicio de settingsservice.ts
  constructor( private _settingsServicio: SettingsService,
               private sidebarService:SidebarService) { }

  ngOnInit(): void {

    this.sidebarService.cargarMenu();                         //(241) Cargo el servicio para ver el menu


  }

}
