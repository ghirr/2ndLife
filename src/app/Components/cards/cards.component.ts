import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/Services/panier.service';
import { ProduitService } from 'src/app/Services/produit.service';
//import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  Objets:any=[];
  constructor(private produitservice:ProduitService, private panierservice: PanierService){
    this.getObjets();
  }
  ngOnInit(): void {

  }



  getObjets(){
    return this.produitservice.getAllProduit().subscribe((result) => {
      console.log("here", result.objets);
      this.Objets = result.objets;
    });
  };
  panier: any[] = [];

  /*Objets:any[] = [
    { id: 1, name: 'Jeans', price: 109, quantity: 1 },

  ];*/

  addToCart(objet : any) {
localStorage.setItem("objets",JSON.stringify(objet))   
  }


  }

