import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the correct Router module
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  Objets:any=[];
  constructor(private produitservice:ProduitService,private router:Router){
    this.getAllProduit();
  }

  ngOnInit(): void {
    this.getAllProduit();
  }

  getAllProduit() {
    this.produitservice.getAllProduit().subscribe(
      (result) => {
        console.log("here", result.objets);
        this.Objets = result.objets;
      }
    );
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
