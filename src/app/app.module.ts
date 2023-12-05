import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from 'src/app/Components/authentification/authentification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from 'src/app/Components/navbar/navbar.component';
import { ErrorPageComponent } from 'src/app/Components/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashAdminComponent } from 'src/app/Components/dash-admin/dash-admin.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { ListproduitComponent } from './Components/listproduit/listproduit.component';
import { BannerComponent } from './Components/banner/banner.component';
import { EditProduitComponent } from './Components/edit-produit/edit-produit.component';
import { CardsComponent } from './Components/cards/cards.component';
import { LoginComponent } from './Components/login-livreur/login.component';
import { SignupComponent } from './Components/signup-livreur/signup.component';
import { RecoverPWDComponent } from './Components/recover-pwd-livreur/recover-pwd.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    NavbarComponent,
    ErrorPageComponent,
    DashAdminComponent,
    HeaderComponent,
    FooterComponent,
    AddProduitComponent,
    ListproduitComponent,
    BannerComponent,
    EditProduitComponent,
    CardsComponent,
    LoginComponent,
    SignupComponent,
    RecoverPWDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
