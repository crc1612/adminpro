import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ModalNewUserService } from '../../components/modal-new-user/modal-new-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  tipo: string = 'usuario';

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public usuarioService: UsuarioService,
               public modalUploadService: ModalUploadService,
               public modalNewUserService: ModalNewUserService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe( (resp: any) => {
      this.cargarUsuarios();
    });
    this.modalNewUserService.notificacion.subscribe( (resp: any) => {
      this.cargarUsuarios();
    });
  }

  mostrarModal( id: string, img: string ) {
    this.modalUploadService.mostrarModal('usuarios', id, img, this.usuarioService.usuario._id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde ).subscribe( (resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    // console.log(termino);
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuario( termino ).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }
  borrarUsuario(usuario: Usuario) {
    // console.log(usuario);
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true
    })
    .then( borrar => {
      console.log( borrar );
      if (borrar) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe( borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModalUser() {
    this.modalNewUserService.mostrarModal('usuarios', this.usuarioService.usuario._id);
  }

}
