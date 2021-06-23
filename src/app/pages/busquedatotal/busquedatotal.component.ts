import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//SERVICIO
import { BusquedasService } from 'src/app/services/busquedas.service';

//MODELOS para manejar la respuesta del servicio
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busquedatotal',
  templateUrl: './busquedatotal.component.html',
  styles: [
  ]
})
export class BusquedatotalComponent implements OnInit {

  public usuarios:Usuario[]=[]                                  //(239) importamos los modelos de los tres tipos usu, medico,hospti
  public medicos:Medico[]=[]
  public hospitales:Hospital[]=[]



  constructor(private activatedRoute:ActivatedRoute,
            private busquedaService:BusquedasService,
            private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({termino})=> {this.busquedaTotal(termino)});

    /* console.log(termino) */
    /* .subscribe(respuesta => console.log(respuesta)); */   // (238) con esto se obtiene lo que se escribe en la ruta http://localhost:4200/#/buscar/sdfsdfssd

  }

  //* (239) Busqueda total y añadirmos el servicio
  busquedaTotal(termino:string){

    this.busquedaService.busquedaGeneral(termino)
        .subscribe((respuesta:any)=>{


          /* console.log(respuesta); */

          this.usuarios=respuesta.usuarios;               // (239) 3.58 exportamos los arreglos al html con *ngFor
          this.medicos=respuesta.medicos;
          this.hospitales=respuesta.hospitales;




        });

  }

}
