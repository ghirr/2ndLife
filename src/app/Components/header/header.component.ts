import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  count:any=0;
  auth !: Subscription 
  constructor(private cartService: PanierService) {
    this.count=JSON.parse(localStorage.getItem("objets") || '[]').length;

  }

  ngOnInit(): void {
    this.countn();
 


  

}

countn(){
      // Souscrire à l'observable pour mettre à jour le compteur
  this.auth= this.cartService.getCount().subscribe((newCount) => {
    this.count = newCount;
  });
}
}