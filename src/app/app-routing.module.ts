import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from 'src/app/Components/authentification/authentification.component';
import { ErrorPageComponent } from 'src/app/Components/error-page/error-page.component';
import { DashAdminComponent } from 'src/app/Components/dash-admin/dash-admin.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { HomeComponent } from './Components/home/home.component';
import { ListproduitComponent } from './Components/listproduit/listproduit.component';
import { EditProduitComponent } from './Components/edit-produit/edit-produit.component';
import { CardsComponent } from './Components/cards/cards.component';
import { LoginComponent } from './Components/login-livreur/login.component';
import { SignupComponent } from './Components/signup-livreur/signup.component';
import { RecoverPWDComponent } from './Components/recover-pwd-livreur/recover-pwd.component';
import { PanierComponent } from './Components/panier/panier.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashLivComponent } from './Components/dash-liv/dash-liv.component';
import { MesLivraisonsComponent } from './Components/mes-livraisons/mes-livraisons.component';

const routes: Routes = [
  {path:"auth",component:AuthentificationComponent},
  {path:"profile",component:ProfileComponent},
  
  //{path:"home",component:HomeComponent},
  {path:"dash",component:DashAdminComponent},
  
  {path:"add-produit", component:AddProduitComponent},
  //{path:"home", component:HomeComponent}
  {path:"", component:HomeComponent},
  //{path:"home", component:HomeComponent},
  {path:"list", component:ListproduitComponent},
  {path:"edit-produit/:id" , component:EditProduitComponent},
  {path:"cards" , component:CardsComponent},
  { path: "panier", component: PanierComponent },

  {path: 'login-liv' , component:LoginComponent},
  {path: 'signup-liv' , component:SignupComponent},
  {path: 'recover-pwd-liv' , component:RecoverPWDComponent},
  {path:"dash-liv",component:DashLivComponent},
  {path:"mesLivraisons",component:MesLivraisonsComponent},
  {path:"dash",component:DashAdminComponent},


  {path:"**",pathMatch: 'full',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
