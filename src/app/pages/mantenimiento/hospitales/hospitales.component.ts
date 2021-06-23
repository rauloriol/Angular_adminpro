import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';


//MODEL
import { Hospital } from 'src/app/models/hospital.model';             // importamos el modelo
//SERVICES
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';  // importamos el servicio
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
//SWEETALERT
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {



  public hospitales:Hospital[]=[];
  public hospitalTemp:Hospital[]=[];                                 // (221) 5.53 min Extraemos dos propiedades un array de objetos de hospitales esta vacio
  public cargando:boolean=true;                                     // (217) Al iniciar el componente esta cargando

  constructor(private hospitalServicio:HospitalService, private busquedaServicio:BusquedasService,private modalService:ModalImagenService) { }

  ngOnInit(): void {

    this.cargarHospital();
  }


    //221 Buscar Hospitales
  buscarHospitales(termino:string){

    if (termino.length===0) {
      return this.hospitales = this.hospitalTemp;
   }
   /* console.log(termino); */
   this.busquedaServicio.buscarHospi('hospitales',termino).subscribe((respuesta:any)=>{
             /* console.log(respuesta); */
             this.hospitales=respuesta})

  }

  cargarHospital(){                                           //  (217 )1.42 min lo exportamos el html en <tr mediante ngFor="let hospital of hospitales"

    this.cargando=true;
    this.hospitalServicio.cargarHospitales()
        .subscribe( respuesta=> {

          this.cargando=false;
          this.hospitales= respuesta;
          this.hospitalTemp= respuesta;
        })
    this.modalService.imagenActualizadaEmiter
    .pipe(
      delay(100)
    )
    .subscribe( img => this.cargarHospital()); // (210) nos subscribimos al evente y nos carga los hospitales

  }
  // 220 Fin crud hospitales
  actualizarHospi(hospital:Hospital){

    /* console.log(hospital); */
    this.hospitalServicio.actualizarHospital(hospital.hospitalId, hospital.nombre)
                          .subscribe(respuesta=>{
                                   /*  console.log(respuesta); */
                                    Swal.fire({
                                      title: 'Actualizado' ,
                                      text: `${hospital.nombre}`,
                                      icon: 'success'

                                    })

                                  })

  }
  //220 Fin crud hospitales
  eliminarHospi(hospital:Hospital){


    Swal.fire({
      title: '¿Borrar Hospital?',
      text: `Quieres borrar  [${hospital.nombre}]`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar Hospital'
    }).then((result) => {
      if (result.value) {

        this.hospitalServicio.eliminarHospital(hospital.hospitalId)
                          .subscribe(respuesta=>{
                                    /* console.log(respuesta); */
                                    this.cargarHospital();
                                    Swal.fire({
                                      title: 'Eliminado' ,
                                      text: `${hospital.nombre}`,
                                      icon: 'success'

                                    })
                                  })
      }
    })
  }

  // (220) crear Hospital
  async abrirSweetAlert(){

    try {

      const { value='' } = await Swal.fire<string>({
        title:'Crear hospital',
        input: 'text',
        text:'Introduce nombre nuevo hospital',
        inputPlaceholder: 'Nombre del hospital',
        showCancelButton:true
      })

      // Si escribe algo en el cuadro de texto
      if (value.trim().length>0) {

        this.hospitalServicio.crearHospital(value).subscribe(respuesta=>{

          this.cargarHospital();

          Swal.fire({
            title: 'Creado' ,
            text: 'Hospital creado',
            icon: 'success'})
        })
      }
      /* console.log(value); */

    } catch (error) {
      console.error('Fallo creacion de hospital  ->',error)

    }

  }

  //* (208) Abrir modal de imagen
  abrirModal(hospital:Hospital){                         // lo exportamos al html en <img [src]="hospital.img | imagen :'hospitales'" class="ancho50">
    this.modalService.mostrarModal('hospitales',hospital.hospitalId,hospital.img);
  }









}
