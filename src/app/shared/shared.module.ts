import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalNewUserComponent } from '../components/modal-new-user/modal-new-user.component';
import { ModalNewMedicoComponent } from '../components/modal-new-medico/modal-new-medico.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        ModalNewMedicoComponent,
        ModalNewUserComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        ModalNewMedicoComponent,
        ModalNewUserComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule {}
