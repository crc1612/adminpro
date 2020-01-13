import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) { }
  canActivate(): Promise<boolean> | boolean {
    const token = this.usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ) );
    const expirado = this.expirado( payload.exe );

    /* console.log(expirado);
    console.log(payload); */

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject ) => {
      const tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();
      // console.log(tokenExp);
      ahora.setTime(ahora.getTime() + 14400000);
      // console.log(ahora);
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }
      resolve(true);
    });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }
  }
}
