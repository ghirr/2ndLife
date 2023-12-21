import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  pageSizeOptions= [6,9];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  FilterObjets: any=[];
  constructor(private produitservice:ProduitService, private panierservice: PanierService){
   
  }
  ngOnInit(): void {
    this.getObjets();
  }



  totalItems: number = 0;
  pageSize: number = 6;

  getObjets(){
    return this.produitservice.getAllProduit().subscribe((result) => {
      console.log("here", result.objets);
      this.Objets = result.objets;
      this.FilterObjets=this.Objets;
      this.totalItems = this.FilterObjets.length;
      

    });
  };

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalItems = e.length;
    this.pageSize = e.pageSize;
    //this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  rechercher(e:Event){
    let search=(e.target as HTMLInputElement).value.toLowerCase();
    if (search !="") {
      this.FilterObjets=this.Objets.filter((obj:any)=>{
        return obj.name.toLowerCase().includes(search) ;
      })
    }
    else{
      this.FilterObjets=this.Objets;
    }
    
  }
  

  panier: any[] = [];


  addToCart(objet : any) {
     this.panierservice.addPanier(objet);
  }


  }

