import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img) {
      return url + '/usuario/xxxx';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch ( tipo ) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      case 'medicos':
        url += '/medicos/' + img;
        break;
      case 'hospitales':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medico, hospital');
        url += '/usuarios/xxx';
    }
    return url;
  }

}
