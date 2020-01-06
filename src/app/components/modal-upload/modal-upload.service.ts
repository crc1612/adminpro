import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public img: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any> ();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
    this.img = null;
  }

  mostrarModal( tipo: string, id: string, img: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
    this.img = img;
  }
}
