import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalNewMedicoService } from './modal-new-medico.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';

declare function init_plugins(): any;

@Component({
  selector: 'app-modal-new-medico',
  templateUrl: './modal-new-medico.component.html',
  styles: []
})
export class ModalNewMedicoComponent implements OnInit {

  oculto: string = '';
  imagenSubir: File;
  imagenTemp: any = null;
  forma: FormGroup;
  hospitales: Hospital[] = [];

  constructor(public cargaArchivoService: SubirArchivoService,
              public modalNewMedicoService: ModalNewMedicoService,
              public usuarioService: UsuarioService,
              public medicoService: MedicoService,
              public hospitalService: HospitalService ) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      hospital: new FormControl('Hospital', Validators.required),
      img: new FormControl(null)
    });
    this.hospitalService.cargarHospitales2().subscribe( (resp: any) => this.hospitales = resp.hospitales );
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalNewMedicoService.ocultarModal();
    // window.location.reload();
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

  /* subirImagen() {
    this.cargaArchivoService
    .subirArchivo( this.imagenSubir, this.modalNewUserService.tipo, this.modalNewUserService.id, this.modalNewUserService.user )
    .then( resp => {
      this.modalNewUserService.notificacion.emit( resp );
      Swal.fire('Se Actualizo la imagen', 'Se actualizo correctamente la imagen', 'success');
      this.cerrarModal();
    })
    .catch( err => {
      console.log('Error en la carga ....');
    });
  } */

  crearMedico() {
    if ( this.forma.invalid ) {
      return;
    }
    // console.log(this.forma);
    const medico = new Medico(
      this.forma.value.nombre,
      this.usuarioService.usuario,
      this.forma.value.hospital
      // this.forma.value.img,
    );
    // console.log(medico);
    this.medicoService.crearMedico( medico )
      .subscribe( rpta => {
        // console.log(rpta);
        // this.router.navigate(['/login']);
        this.cargaArchivoService
              .subirArchivo( this.imagenSubir, 'medicos', rpta._id, this.modalNewMedicoService.user )
              .then( (resp: any) => {
                  this.modalNewMedicoService.notificacion.emit( resp );
                  Swal.fire('Medico creado', resp.nombre , 'success');
              }).catch( err => {
                  console.log('Error en la carga ....');
              });
      });
  }
}
