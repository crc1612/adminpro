import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalNewUserService {

  public tipo: string;
  public user: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any> ();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.user = null;
  }

  mostrarModal( tipo: string, user: string ) {
    this.oculto = '';
    this.tipo = tipo;
    this.user = user;
  }
}
