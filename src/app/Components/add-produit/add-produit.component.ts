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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      //this.title = "Modifier produit";
      this.produitservice.getProduitById(this.id).subscribe(
        (data: any)=> {
          this.router.navigate;
        }
      )
    } else {
      //this.title = "Ajouter un objet";
    }
    this.productForm = this.formBuilder.group({
      image: [null, Validators.required],
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
    console.log('Here my object', this.produit);
      // add produit
      let formData = new FormData();
    formData.append('image', this.produit.image);
    formData.append('name', this.produit.name);
  //  formData.append('catagorie', produit.catagorie);
    formData.append('description', this.produit.description);
    formData.append('price', this.produit.price);
    formData.append('adresse', this.produit.adresse);
    console.log(formData);
    
      this.produitservice.addProduit(this.produit)
         this.router.navigate(["/list"]);
        }
      
    }   
  


