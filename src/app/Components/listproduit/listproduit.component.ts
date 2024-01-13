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
  filteredObjets:any=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  totalItems: number = 0;
  pageSize: number = 3;
  pageEvent!: PageEvent;
  selectedOption: any='0';
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
        this.filteredObjets=this.Objets;
        this.totalItems = this.filteredObjets.length;
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
  onOptionChange(){
    if(this.selectedOption==='0'){
      this.filteredObjets = this.Objets;
    }
    if(this.selectedOption==='2'){
      console.log("waywa");
      
      this.filteredObjets = this.Objets.filter((obj: any) => {
        console.log(obj.price);
        
        return obj.vendu===undefined;
      });
    }
    if(this.selectedOption==='1'){
      console.log("mama");
      
     this.filteredObjets = this.Objets.filter((obj: any) => {
        return obj.vendu;
      });
    }
  }
}
