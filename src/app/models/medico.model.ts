import { Usuario } from './usuario.model';
export class Medico {

    constructor(
        public nombre?: string,
        public usuario?: Usuario,
        public hospital?: string,
        public img?: string,
        public _id?: string
    ) {  }
}
