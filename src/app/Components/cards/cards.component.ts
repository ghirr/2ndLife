import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/Services/produit.service';
//import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  Objets:any=[];
  constructor(private produitservice:ProduitService){
    this.getObjets();
  }
  ngOnInit(): void {

  }
  itemList: string[] = ['Item C', 'Item A', 'Item B', 'Item D'];
  filteredList: string[] = [...this.itemList];
  searchQuery: string = '';

  sortList() {
    this.filteredList.sort();
  }

  getObjets(){
    return this.produitservice.getAllProduit().subscribe((result) => {
      console.log("here", result.objets);
      this.Objets = result.objets;
    });
  };
  }

