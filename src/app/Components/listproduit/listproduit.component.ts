import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router'; // Import the correct Router module
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  Objets:any=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  totalItems: number = 0;
  pageSize: number = 3;
  pageEvent!: PageEvent;
  constructor(private produitservice:ProduitService,private router:Router){
    this.getAllProduit();
  }

  ngOnInit(): void {
    this.getAllProduit();
  }

  getAllProduit() {
    let user = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    this.produitservice.getProduitByUserEmail(user.email).subscribe(
      (result) => {
        console.log("here", result.objets);
        this.Objets = result.objets;
        this.totalItems = this.Objets.length;
      }
    );
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalItems = e.length;
    this.pageSize = e.pageSize;
    //this.pageIndex = e.pageIndex;
  }

  deleteProduit(id: any) {
    this.produitservice.deleteProduit(id).subscribe(() => {
      this.getAllProduit(); // After deletion, fetch the updated list of products
    });
  }

  editProduit(id: any) {
    
      this.router.navigate([`edit-produit/${id}`]);
    
  }
}
