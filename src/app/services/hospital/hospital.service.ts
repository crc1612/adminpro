import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public subirArchivoService: SubirArchivoService ) {
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

  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  cargarHospitales2() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get( url );
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(map( (resp: any) => resp.hospital ));
  }
  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
    }));
  }
  crearHospital( nombre: string ) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;
    return this.http.post(url, { nombre, usuario: this.usuario })
        .pipe(map((resp: any) => {
          Swal.fire('Hospital creado', nombre , 'success');
          return resp.hospital;
        }));
  }
  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(map( (resp: any) => {
      return resp.hospitales;
    }));
  }
  actualizarHospital( hospital: Hospital ) {
    hospital.usuario = this.usuario;
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    // console.log(url);
    return this.http.put( url, hospital ).pipe(map((resp: any) => {
      // this.hospital = resp.hospital;
      Swal.fire('hospital Actualizado', hospital.nombre, 'success');
      return true;
    }));
  }
}
