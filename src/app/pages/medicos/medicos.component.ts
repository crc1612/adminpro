import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalNewMedicoService } from 'src/app/components/modal-new-medico/modal-new-medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  // @ViewChild('nombre', {static: false}) nameField: ElementRef;

  editName( index: any ) {
    index = 'e' + index;
    (document.getElementById(index) as HTMLInputElement).disabled = false;
    document.getElementById(index).focus();
  }
  outFocus( index: any ) {
    index = 'e' + index;
    (document.getElementById(index) as HTMLInputElement).disabled = true;
  }

  constructor( public medicoService: MedicoService,
               public usuarioService: UsuarioService,
               public modalNewMedicoService: ModalNewMedicoService,
               public modalUploadService: ModalUploadService,
               public hospitalService: HospitalService ) { }

  ngOnInit() {
    this.hospitalService.cargarHospitales2().subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this.cargarMedicos();
    this.modalUploadService.notificacion.subscribe( () => {
      this.cargarMedicos();
    });
    this.modalNewMedicoService.notificacion.subscribe( () => {
      this.cargarMedicos();
    });
  }

  trackByFn( item: any, id: number ) {
    return item;
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde ).subscribe( (resp: any) => {
      // console.log(resp);
      if ( resp.total === 0 ) {
        this.cargando = false;
      }
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      // console.log(this.medicos);
      this.cargando = false;
      // console.log(this.hospitales);
    });
  }

  buscarMedicos( termino: string ) {
    // console.log(termino);
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this.medicoService.buscarMedicos( termino ).subscribe( (medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  mostrarModalMedico() {
    this.modalNewMedicoService.mostrarModal('medicos', this.usuarioService.usuario._id);
  }

  mostrarModal( id: string, img: string ) {
    this.modalUploadService.mostrarModal('medicos', id, img, this.usuarioService.usuario._id);
  }

  borrarMedico(medico: Medico) {
    // console.log(usuario);
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true
    })
    .then( borrar => {
      // console.log( borrar );
      if (borrar) {
        this.medicoService.borrarMedico(medico._id).subscribe( borrado => {
          // console.log(borrado);
          this.cargarMedicos();
        });
      }
    });
  }
  guardarMedico(medico: Medico) {
    // console.log(medico);
    this.medicoService.actualizarMedico(medico).subscribe();
  }

}
