import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { VerificaTokenGuard } from './services/guards/verifica-token.guard';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {enableTracing: false} );
