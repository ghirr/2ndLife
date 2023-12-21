import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent {
  produit:any={};
  productForm!: FormGroup;
  id:any;
  //title:string="Ajouter un objet"
  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private produitservice:ProduitService,
    private router:Router) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      image1: [null, Validators.required],
      nom: ["", Validators.required],
      description: ["", Validators.required],
      prix: ["", Validators.required],
      adresse: ["", Validators.required]
    });
  }
  onImageSelected(event: Event) {
    
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.produit.image = file;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
  addEditProduit(){
    this.produit.prod=this.productForm.value;
    this.produit.user = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    console.log('Here my object', this.produit);
    
      this.produitservice.addProduit(this.produit)
         this.router.navigate(["/list"]);
        }
      
    }   
  


