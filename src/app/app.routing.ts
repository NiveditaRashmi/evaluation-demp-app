import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuditComponent } from './audit';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'audit', component: AuditComponent , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/audit', pathMatch: 'full' },    
    
    
    

    // otherwise redirect to home
    { path: '**', component: AuditComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);