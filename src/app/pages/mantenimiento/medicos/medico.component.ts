import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';           // (227) creacion del formulario con formgroup y builder
//MODELOS
import { Hospital } from 'src/app/models/hospital.model';                      // (227) 6.30 min instancioamos el modelo hospital
import { Medico } from 'src/app/models/medico.model';
// SERVICIOS
import { HospitalService } from 'src/app/services/hospital.service';           // (227) 5.40 min instanciamos el servio hospital para obtener los datos de la BD
import { MedicoService } from 'src/app/services/medico.service';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoSeleccionado:Medico;                      // (229) Para que no aparezca imagen si no hay foto
  public hospitalSeleccionado:Hospital;                 // (228) Para ver la info que quiera en la segunda tarjeta
  public hospitales:Hospital[]=[];                      // (227) 8.03 min exportar al html en select
  public medicoFormulario:FormGroup;                   // (227) 0.51 min Formulario del médico se exporta al html
                                                      // se exporta como [formGroup]="medicoFormulario">



      constructor(private formBuilder:FormBuilder,     // (227) 1.07 min instanciar el formBuilder
              private hospitalServicio:HospitalService,
              private medicoServicio:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }



  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id})=>      // (230)8.03 min una ver cambie el id tendre el medico seleccionado
      this.cargarMedico(id)
      /* console.log(id) */
    );


    this.medicoFormulario = this.formBuilder.group({    // (227) 1.18 min aqui dentro van los campos del formulario que tb estan en POST http://localhost:4001/api/medicos/

      nombre:['',Validators.required],                 // en el imput se pone-> formControlName="nombre"
      hospital:['',Validators.required]                // en el select se pone-> formControlName="hospital"
    })

    this.cargarHospitales();
    this.cargarFormulario();


  }

  // (230) 8.24 min
  cargarMedico(id:string){
                                                // (231) Validacion para arreglar el error al presionar boton de nuevo

      if (id==='nuevo') {                       //(231) si es nuevo no hago nada, no hay que establecer valores ni nada
        return;
      }

     this.medicoServicio.obtenerMedicoPorId(id)
        .pipe(                                    // (232) Colocamos un Delay pera que de tiempo a cargar la foto
              delay(100)
        )
        .subscribe(respuesta=>{

          if (!respuesta) {                     // si no existe repuesta, es que se ha introducido mal el url lo redirijo a los medicos
            this.router.navigateByUrl('/medicos');            // (229) Redirigimos a la lista de medicos
          }

          /* console.log(respuesta); */
          const {nombre, hospital:{_id}} = respuesta     // (231) 1.25 min hago una desestructuracion de la respuesta para obtner lo que quiero
          /* console.log(nombre,_id); */
          this.medicoSeleccionado= respuesta;
          this.medicoFormulario.setValue({nombre,hospital: _id}); // con esto establecemos que en el formulario esten los valores que tenemos en la tabla
        })

  }


  // (277) Metodo para ver los hospiales desde la BD utilizando el servicio, la respuesta es un array de hospitales
  cargarHospitales(){

    this.hospitalServicio.cargarHospitales().subscribe( (respuesta:Hospital[])=>{
                          this.hospitales=respuesta })
      /* console.log(respuesta); */
  }

  // (227) y (229) Ver los valores que estan en el formulario
                                                      // Asi se guarda un nuevo medico en la BD
  guardarMedico(){

                              //(231) 4.22 min Si tengo un medico seleccionado, lo actualizo
    if (this.medicoSeleccionado) {
                                                 // (231) 5.24min Actualizo y para ello desestruturo los datos que me vienen del formulario
      const datos = {
          ...this.medicoFormulario.value,
          _id:this.medicoSeleccionado._id}

      const {nombre}= this.medicoFormulario.value;

      this.medicoServicio.actualizarMedico(datos).subscribe(respuesta=>{

        /* console.log(respuesta); */
      Swal.fire({
        title: 'Actualizado' ,
        text: `[${nombre}] Actualizado correctamente`,
        icon: 'success'});
      })
    }
      else{
                            // (231) Creo uno nuevo
      /* console.log(this.medicoFormulario.value); */
    this.medicoServicio.crearMedico(this.medicoFormulario.value).subscribe(respuesta=>{

      /* console.log(respuesta); */
      Swal.fire({
        title: 'Creado' ,
        text: 'Médico creado',
        icon: 'success'});

      this.router.navigateByUrl('/medicos');            // (229) Redirigimos a la lista de medicos

    })
    }
  }

  //(230) Para no sobrecargar el onINIT
  cargarFormulario(){

                                                     // (228) Nos subscribimos a los cambios del segundo campo del formulario
    this.medicoFormulario.get('hospital')             // puedo barrer mi arreglo de hospitales y ver cual es el hospital
                          .valueChanges
                          .subscribe(respuestaHospitalId=>{

                            /* console.log(respuestaHospitalId);                // nos devuelve el id del hospital */
                            this.hospitalSeleccionado=this.hospitales.find(hospi=> hospi.hospitalId === respuestaHospitalId);
                            /* console.log(this.hospitalSeleccionado); */       // vemos la info del hospital
                          });
  }

}
