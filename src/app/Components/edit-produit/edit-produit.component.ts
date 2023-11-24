import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {
  produit: any = {};
  productForm!: FormGroup;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private produitservice: ProduitService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.produitservice.getProduitById(this.id).subscribe(
        (data: any) => {
          this.produit = data;
          this.initializeForm();
        }
      )
    } else {
      // Handle the case where no ID is provided (e.g., redirect or show an error)
    }
  }

  initializeForm() {
    this.productForm = this.formBuilder.group({
      image1: [this.produit.image1, Validators.required],
      image2: [this.produit.image2, Validators.required],
      nom: [this.produit.nom, Validators.required],
      description: [this.produit.description, Validators.required],
      prix: [this.produit.prix, Validators.required],
      addresse: [this.produit.addresse, Validators.required]
    });
  }

  editProduit() {
    console.log('Here my edited object', this.produit);
    if (this.id) {
      // Edit existing product
      this.produitservice.editProduit(this.produit).subscribe(
        (response) => {
          console.log("Response from BE after edit", response);
          // Handle success or error as needed
        }
      );
    } else {
      // Redirect to appropriate page or handle as needed
    }
  }
}
