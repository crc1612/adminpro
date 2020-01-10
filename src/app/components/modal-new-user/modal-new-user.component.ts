import { Component, OnInit } from '@angular/core';
import { ModalNewUserService } from './modal-new-user.service';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare function init_plugins(): any;

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styles: []
})
export class ModalNewUserComponent implements OnInit {

  oculto: string = '';
  imagenSubir: File;
  imagenTemp: any = null;
  forma: FormGroup;
  role: string;

  constructor(public cargaArchivoService: SubirArchivoService,
              public modalNewUserService: ModalNewUserService,
              public usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      role: new FormControl('USER_ROLE', Validators.required),
      img: new FormControl(null)
    }, { validators: this.sonIguales( 'password', 'password2') });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalNewUserService.ocultarModal();
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

  crearUsuario() {
    if ( this.forma.invalid ) {
      return;
    }
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.usuarioService.usuario,
      // this.forma.value.img,
      this.forma.value.role
    );
    this.usuarioService.crearUsuario( usuario )
      .subscribe( rpta => {
        console.log(rpta);
        // this.router.navigate(['/login']);
        this.cargaArchivoService
              .subirArchivo( this.imagenSubir, 'usuarios', rpta._id, this.modalNewUserService.user )
              .then( (resp: any) => {
                  this.modalNewUserService.notificacion.emit( resp );
                  Swal.fire('Usuario Creado', 'Se creo correctamente el usuario', 'success');
                  this.cerrarModal();
              }).catch( err => {
                  console.log('Error en la carga ....');
              });
      });
  }
}
