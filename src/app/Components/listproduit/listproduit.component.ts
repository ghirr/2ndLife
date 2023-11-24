import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the correct Router module
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  produits: any[] = [];

  constructor(private router: Router, private produitservice: ProduitService) {} // Inject the Router service

  ngOnInit(): void {
    this.getAllProduit();
  }

  getAllProduit() {
    this.produitservice.getAllProduit().subscribe(
      (data: any) => {
        this.produits = data; // Assign the fetched data to the products array
      }
    );
  }

  deleteProduit(id: any) {
    this.produitservice.deleteProduit(id).subscribe(() => {
      this.getAllProduit(); // After deletion, fetch the updated list of products
    });
  }

  editProduit(id: any) {
    this.produitservice.editProduit(id).subscribe(() => {
      this.router.navigate([`editMatch/${id}`]);
    });
  }
}
