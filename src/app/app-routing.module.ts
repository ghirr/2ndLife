import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from 'src/app/Pages/authentification/authentification.component';
import { ErrorPageComponent } from 'src/app/Pages/error-page/error-page.component';
import { HomeComponent } from 'src/app/Pages/home/home.component';
import { DashAdminComponent } from 'src/app/Pages/dash-admin/dash-admin.component';

const routes: Routes = [
  {path:"",component:AuthentificationComponent},
  
  {path:"home",component:HomeComponent},
  {path:"dash",component:DashAdminComponent},
  {path:"**",pathMatch: 'full',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
