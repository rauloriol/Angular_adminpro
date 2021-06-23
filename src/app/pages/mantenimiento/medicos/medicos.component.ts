import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

// MODELO
import { Medico } from 'src/app/models/medico.model';
// SERVICIO
import { MedicoService } from 'src/app/services/medico.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos:Medico[]=[];
  public medicoTemp:Medico[]=[];                                 // (221) 5.53 min Extraemos dos propiedades un array de objetos de hospitales esta vacio
  public cargando:boolean=true;                                  // (217) Al iniciar el componente esta cargando


  constructor(private medicoServicio:MedicoService, private busquedaServicio: BusquedasService, private modalService:ModalImagenService) { }

  ngOnInit(): void {

    this.cargarMedico();

    this.modalService.imagenActualizadaEmiter.subscribe( img => this.cargarMedico()) // (210) nos subscribimos al evente y nos carga los medicos
  }




   //224 Buscar Medicos
   buscarMedicos(termino:string){

    if (termino.length===0) {
      return this.medicos = this.medicoTemp;
   }
   /* console.log(termino); */
   this.busquedaServicio.buscarHospi('medicos',termino).subscribe((respuesta:any)=>{
             /* console.log(respuesta); */
             this.medicos=respuesta})

  }


  cargarMedico(){                                          //  (217 )1.42 min lo exportamos el html en <tr mediante *ngFor="let medico of medicos"

  this.cargando=true;
  this.medicoServicio.cargarMedicos()
      .pipe(
        delay(100)
        )
      .subscribe( respuesta=> {

        this.cargando=false;
        this.medicos= respuesta;
        this.medicoTemp= respuesta;
      })

}




  //223 Fin crud medicos
  eliminarMedico(medico:Medico){

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Quieres borrar a  [${medico.nombre}]`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar Médico'
    }).then((result) => {
      if (result.value) {
        this.medicoServicio.eliminarMedico(medico)
                          .subscribe(respuesta=>{
                                    /* console.log(respuesta); */
                                    this.cargarMedico();
                                    Swal.fire({
                                      title: 'Eliminado' ,
                                      text: `${medico.nombre}`,
                                      icon: 'success'
                                    })
                                  })

      }
    })
  } //final metodo


  //* (208) Abrir modal de imagen
  abrirModal(medico:Medico){                         // lo exportamos al html en <img [src]="medico.img | imagenmedico :'medicos'" class="ancho50">
    this.modalService.mostrarModal('medicos',medico._id,medico.img);
  }

}
