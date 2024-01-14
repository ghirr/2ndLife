import { Component, OnInit } from '@angular/core';
import { UserauthService } from './Services/userauth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '2ndLife';
  user: any; // Replace 'any' with the actual type of your user object.
  showHeader = true;
  showFooter = true;

  constructor(private userService:UserauthService,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects.split('?')[0];
        console.log(currentPath);
        
        if (!['/', '/auth', '/list', '/cards', '/panier', '/add-produit', '/edit-produit/:id', '/login-liv', '/signup-liv', '/recover-pwd-liv', '/dash-liv', '/profile', '/mesLivraisons', '/dash', '/admin/plats', '/admin/users', '/admin/tables', '/dash', '/add-produit'].includes(currentPath)) {
          this.showHeader = false;
          this.showFooter = false;
        }
        else{
          this.showHeader = true;
          this.showFooter = true;
        } 
      }
    });
  }

  ngOnInit() {
   
}
}
