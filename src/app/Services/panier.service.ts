import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  /*cartItems: any[] = [];
  totalAmount: number | undefined;

  constructor(private router: Router) { }

  addItemsToCart = (product: { 
    id: any;
    nom: any;
    prix: any;
    description: any;
    derniere_maj: any;
    quantity: number;
    url: any;
    image: any;
  }) => {
    let productExists = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i].id === product.id) {
        this.cartItems[i].quantity++;
        productExists = true;
        this.getTotalAmount();
        break;
      }
    }
    if (!productExists) {
      this.cartItems.push({
        id: product.id,
        nom: product.nom,
        prix: product.prix,
        description: product.description,
        derniere_maj: product.derniere_maj,
        quantity: 1,
        url: product.url,
        image: product.image
      });
    }
    this.getTotalAmount();
  }

  getTotalAmount() {
    if (this.cartItems) {
      this.totalAmount = 0;
      this.cartItems.forEach((item) => {
        this.totalAmount! += (item.quantity * item.prix);
      });
      return {
        totalAmount: this.totalAmount
      };
    }
  }
  

  getItemsFromCart = () => {
    return this.cartItems;
  }*/
  
  // ... (rest of the methods remain the same)
}
