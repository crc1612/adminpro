import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string = '';
  imagenSubir: File;
  imagenTemp: any;

  constructor( public cargaArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File) {
    if (!archivo) {
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this.cargaArchivoService
    .subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id, this.modalUploadService.user )
    .then( resp => {
      this.modalUploadService.notificacion.emit( resp );
      Swal.fire('Se Actualizo la imagen', 'Se actualizo correctamente la imagen', 'success');
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga ....');
    });
  }

}
