import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public hospitalService: HospitalService, public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe( () => {
      this.cargarHospitales();
    });
  }

  editName( index: any ) {
    index = 'e' + index;
    (document.getElementById(index) as HTMLInputElement).disabled = false;
    document.getElementById(index).focus();
  }
  outFocus( index: any ) {
    index = 'e' + index;
    (document.getElementById(index) as HTMLInputElement).disabled = true;
  }

  mostrarModal( id: string, img: string ) {
    this.modalUploadService.mostrarModal('hospitales', id, img, this.hospitalService.usuario._id);
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales( this.desde ).subscribe( (resp: any) => {
      // console.log(resp);
      if ( resp.total === 0 ) {
        this.cargando = false;
      }
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
      // console.log(this.hospitales);
    });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital( termino: string ) {
    // console.log(termino);
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService.buscarHospital( termino ).subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }
  borrarHospital(hospital: Hospital) {
    // console.log(usuario);
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    })
    .then( (borrar: any) => {
      // console.log( borrar );
      if (borrar) {
        this.hospitalService.borrarHospital(hospital._id).subscribe( borrado => {
          // console.log(borrado);
          this.cargarHospitales();
        });
      }
    });
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
  crearHospital() {
    // console.log('Funciona!');
    Swal.fire({
      icon: 'info',
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    }).then( resp => {
      this.hospitalService.crearHospital(resp.value).subscribe( () => this.cargarHospitales() );
    });
  }
}
