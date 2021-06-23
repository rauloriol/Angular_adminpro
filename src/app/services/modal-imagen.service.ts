//(208) Servicio para ocultar o enseñar modal

import { Injectable,EventEmitter } from '@angular/core';     // (210) Importacion del event emiter
import { environment } from 'src/environments/environment';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

                                                //* (208) 3.17 min Exportamos este servicio a componentes modal-imagen
                        // (209) 4.29 min Defino tb estas propiedades
  public tipo: 'usuarios' | 'medicos'| 'hospitales'
  public id:string;
  public img?:string;
  private _ocultarModal:boolean= true;           // por defecto el modal esta oculto

                                                //*  (210) 5.21 min  Colocar un event Emiter que me notifique cuando se actualiza el componente
                                                //* Me genera un observable que me puedo subscribir donde quiera => en usuarios,hospitales, medicos (mantenimiento)
  public imagenActualizadaEmiter: EventEmitter<string>= new EventEmitter<string>();


      mostrarModal(

          tipo:'usuarios'|'medicos'|'hospitales',
          id:string,
          img:string='nofoto'

          ){

            this._ocultarModal=false;
            this.tipo=tipo;
            this.id=id;
        /* this.img=img; */
        // http://localhost:4001/api/upload/medicos/631a761f-cafb-4ea3-bd5b-f92dca4ddc63.png --> ruta api para ver img

        if (img.includes('https')) {
          this.img=img;

        }else{
            this.img = `${base_url}/upload/${tipo}/${img}`;
        }

      }


      ocultarModal(){
        this._ocultarModal=true;
      }

      get estadoModal(){              // (208) Exportar el servicio y con este metodo para cuando hagamos click en una imagen salga el modal
        return this._ocultarModal;
      }

  constructor() { }
}
