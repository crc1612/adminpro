import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalNewUserComponent } from '../components/modal-new-user/modal-new-user.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MedicosComponent } from './medicos/medicos.component';
import { ModalNewMedicoComponent } from '../components/modal-new-medico/modal-new-medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent,
      IncrementadorComponent,
      GraficoDonaComponent,
      AccountSettingsComponent,
      PromesasComponent,
      RxjsComponent,
      ProfileComponent,
      UsuariosComponent,
      ModalUploadComponent,
      HospitalesComponent,
      ModalNewUserComponent,
      MedicosComponent,
      ModalNewMedicoComponent,
      BusquedaComponent
    ],
    exports: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent,
      IncrementadorComponent,
      GraficoDonaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        ChartsModule,
        PipesModule,
        SweetAlert2Module,
        FormsModule,
        ReactiveFormsModule
    ]
  })

  export class PagesModule { }
