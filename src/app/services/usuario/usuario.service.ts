import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public subirArchivoService: SubirArchivoService) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogueado() {
    return( this.token.length > 1) ? true : false;
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

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '#/login';
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token }).pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }


  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario?token=' + this.token;
    return this.http.post(url, usuario)
        .pipe(map((resp: any) => {
          Swal.fire('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        }));
  }
  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    // console.log(url);
    usuario.updateBody = this.usuario;
    return this.http.put( url, usuario ).pipe(map((resp: any) => {
      // this.usuario = resp.usuario;
      if (usuario._id === this.usuario._id) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      }
      Swal.fire('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen( file: File, id: string ) {
    this.subirArchivoService.subirArchivo( file, 'usuarios', id, this.usuario._id)
        .then( (resp: any) => {
          // console.log(resp);
          this.usuario.img = resp.usuario.img;
          Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch( (resp: any) => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }
  buscarUsuario( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(map( (resp: any) => {
      return resp.usuarios;
    }));
  }
  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
    }));
  }
}
