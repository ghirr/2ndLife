import { Component } from '@angular/core';
import { UserauthService } from './Services/userauth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '2ndLife';
 // user: any; // Replace 'any' with the actual type of your user object.
  showHeader = true;
  showFooter = true;

  constructor(private userService:UserauthService,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects.split('?')[0];
        console.log(currentPath);
        
        if (!['/', '/signup', '/login', '/home', '/menu', '/mesTables', '/table', '/table/:id', '/add-plat', '/add-plat/:id', '/mesTables', '/add-chef', '/add-chef/:id', '/admin/chefs', '/admin/plats', '/admin/users', '/admin/tables', '/dash'].includes(currentPath)) {
          this.showHeader = false;
          this.showFooter = false;
        } 
      }
    });
  }

  ngOnInit() {
  /*  this.userService.getUserData().subscribe((data: any) => {
      if (data.success) {
        this.user = data.user;
        this.router.navigate(['/']);
      } else {
        // Handle the case where the user is not authenticated or an error occurred.
      }
    });*/
  }
}
