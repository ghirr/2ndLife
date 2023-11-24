import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from 'src/app/Pages/authentification/authentification.component';
import { ErrorPageComponent } from 'src/app/Pages/error-page/error-page.component';
import { DashAdminComponent } from 'src/app/Pages/dash-admin/dash-admin.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { HomeComponent } from './Components/home/home.component';
import { ListproduitComponent } from './Components/listproduit/listproduit.component';
import { EditProduitComponent } from './Components/edit-produit/edit-produit.component';
import { CardsComponent } from './Components/cards/cards.component';

const routes: Routes = [
  {path:"auth",component:AuthentificationComponent},
  
  //{path:"home",component:HomeComponent},
  {path:"dash",component:DashAdminComponent},
  //{path:"**",pathMatch: 'full',component:ErrorPageComponent},
  {path:"add-produit", component:AddProduitComponent},
  //{path:"home", component:HomeComponent}
  {path:"", component:HomeComponent},
  {path:"list", component:ListproduitComponent},
  {path:"edit-produit" , component:EditProduitComponent},
  {path:"cards" , component:CardsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
