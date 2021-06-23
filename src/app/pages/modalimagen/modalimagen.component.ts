import { Component, OnInit } from '@angular/core';

//SERVICIOS
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalimagen',
  templateUrl: './modalimagen.component.html',
  styles: [
  ]
})
export class ModalimagenComponent implements OnInit {

  public imagenSubir:File;
  public imgTemp:any=null;



  constructor(public modalService:ModalImagenService, private fileuploadService:FileUploadService) { }

  ngOnInit(): void {}

  cerrarModal(){              // (207) Se exporta al html como
    this.imgTemp=null;        // (209) 2.49 min borrar la imagen para que cuando abra el modal no tenga la img anterior
    this.modalService.ocultarModal();
  }

                                //* (209)  Cargar imagen usando el modal

  cambiarImagen(file:File){
    this.imagenSubir= file;

    if (!file) {
      return this.imgTemp=null;
    }

    const reader= new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend= ()=>{
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){

    const id=this.modalService.id                         // (210) Se definen de donde vienen el id y el tipo
    const tipo=this.modalService.tipo

    this.fileuploadService.actualizarFoto(this.imagenSubir,tipo,id)
            .then( img => {
              Swal.fire({
                title: 'Actualizado',
                text: 'Imagen actualizada',
                icon: 'success',
                confirmButtonText: 'Ok'
              })

              this.modalService.imagenActualizadaEmiter.emit(img)  //(210) 6.37 min emitimos la imagen, el URL
              this.cerrarModal();
            })

            .catch(err => {
              console.log(err);
              Swal.fire({
                title: 'Error',
                text: 'Error imagen no Actualizada',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            })
  }




}
