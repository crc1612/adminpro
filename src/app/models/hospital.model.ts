import { Usuario } from './usuario.model';
export class Hospital {

    constructor(
        public nombre: string,
        public usuario: Usuario,
        public img?: string,
        public _id?: string
    ) { }

}
