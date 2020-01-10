import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen() {
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
