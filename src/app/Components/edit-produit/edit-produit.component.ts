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
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    if (this.id) {
      this.getProjectById()
    }else{
      this.router.navigate(["/list"])
    }
   }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      image1: [this.produit.image, Validators.required],
      nom: [this.produit.name, Validators.required],
      description: [this.produit.description, Validators.required],
      prix: [this.produit.price, Validators.required],
      adresse: [this.produit.addresse, Validators.required]
    });
   
  }
  getProjectById() {


    this.produitservice.getProduitById(this.id).subscribe((res) => {
      this.produit = res.objet;
      console.log(this.produit);
      
    })
  
  
  }

  onImageSelected(event: Event) {
    
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.produit.image = file;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  editProduit() {
    this.produit.prod=this.productForm.value
    if (this.id) {
      // Edit existing product
      this.produitservice.editProduit(this.produit);
       
          this.router.navigate(['/list']);
        
    } else {
      // Redirect to appropriate page or handle as needed
    }
  }
}
