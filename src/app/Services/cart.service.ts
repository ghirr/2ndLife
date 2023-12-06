import { PanierService } from './panier.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  Objets: any[]; 

  constructor(private panierService: PanierService) {
    this.Objets = panierService.getItemsFromCart();
  }

  editProduit(productId: string) {
    
  }

  deleteProduit(productId: string) {
    
  }
}
