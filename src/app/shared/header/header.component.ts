import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  /* private previousUrl: string;
  private currentUrl: string; */

  constructor(public usuarioService: UsuarioService,
              public router: Router,
              private location: Location ) {
    /* this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    }); */
              }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  public getPreviousUrl() {
    /* this.router.navigate([`/${this.previousUrl}`]); */
    this.router.navigate(['/dashboard']);
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }

}
