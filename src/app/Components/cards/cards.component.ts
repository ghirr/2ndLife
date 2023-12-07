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
  panier:Array<any>=[];

  /*Objets:any[] = [
    { id: 1, name: 'Jeans', price: 109, quantity: 1 },

  ];*/

  addToCart(objet:any) {
    /*
    // Retrieve existing data from local storage
     this.panier = JSON.parse(localStorage.getItem("objets") || '[]');
  
    // Append the new object to the existing data
    for (let i = 0; i < this.panier.length; i++) {
      if(objet._id===this.panier[i]._id){
       return
      }
      
    }
    this.panier.push(objet)
    // Store the updated data back in local storage
    localStorage.setItem("objets", JSON.stringify(this.panier));
    */
   this.panierservice.addPanier(objet);
  }


  }

