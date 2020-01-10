import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../hospital/hospital.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medico: Medico;
  hospital: Hospital;
  usuario: Usuario;
  token: string;


  constructor( public http: HttpClient,
               public subirArchivoService: SubirArchivoService,
               public hospitalService: HospitalService ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cargarMedicos( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url );
  }

  buscarMedicos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(map( (resp: any) => {
      return resp.medicos;
    }));
  }

  crearMedico( medico: Medico ) {
    const url = URL_SERVICIOS + '/medico?token=' + this.token;
    return this.http.post(url, medico )
        .pipe(map((resp: any) => {
          return resp.medico;
        }));
  }

  actualizarMedico( medico: Medico ) {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.token;
    // console.log(url);
    medico.usuario = this.usuario;
    return this.http.put( url, medico ).pipe(map((resp: any) => {
      // this.hospital = resp.hospital;
      Swal.fire('Medico Actualizado', medico.nombre, 'success');
      return true;
    }));
  }
  borrarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Medico borrado', 'El medico a sido eliminado correctamente', 'success');
    }));
  }
}
