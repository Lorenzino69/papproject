import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from "./header/login/login.component";
import {SignupComponent} from "./header/signup/signup.component";
import {AuthGuard} from "../guard/auth.guard";
import {NotfoundComponent} from "./shared/notfound/notfound.component"; // Assurez-vous que le chemin est correct

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirige vers /dashboard
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
