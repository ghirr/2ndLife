import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserauthService } from 'src/app/Services/userauth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  //@Input() user: any
 
  constructor(private Uservice:UserauthService){}
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  connectedUser:String=''
  auth !: Subscription 
  ngOnInit(): void {
    let LS = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    if (LS.role) {
      this.connectedUser = LS.role

    }

    this.auth = this.Uservice.serviceToHeader().subscribe((isAuth)=>{
      this.connectedUser =isAuth
    })
  }
  logout() { 
    this.Uservice.logout();
  }


}
