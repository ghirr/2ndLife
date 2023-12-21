import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PanierService } from 'src/app/Services/panier.service';
import { faSignOutAlt ,faUser, faShoppingCart,faNavicon} from '@fortawesome/free-solid-svg-icons';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  count:any=0;
  connectedUser:any
  fa={
    out:faSignOutAlt,in:faUser,panier:faShoppingCart,nav:faNavicon
  }
  listener !: Subscription 
  auth !: Subscription 
  constructor(private cartService: PanierService,private Uservice :UserauthService) {
    this.count=JSON.parse(localStorage.getItem("objets") || '[]').length;
  }

  ngOnInit(): void {
    this.countn();
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser") || '{}')
   

    this.auth = this.Uservice.serviceToHeader().subscribe((isAuth)=>{
      this.connectedUser =isAuth
    })


  

}

countn(){
      // Souscrire à l'observable pour mettre à jour le compteur
  this.listener= this.cartService.getCount().subscribe((newCount) => {
    this.count = newCount;
  });
}
logout() { 
  this.Uservice.logout();
}
}