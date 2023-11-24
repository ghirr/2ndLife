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
        image1: ["", Validators.required], // Adjust this if needed
        image2: ["", Validators.required], // Adjust this if needed
        nom: ["", Validators.required],
        description: ["", Validators.required],
        prix: ["", Validators.required],
        addresse: ["", Validators.required]
    });
  }
  addProduit(){
    console.log('Here my object', this.produit);
    /*if (this.id) {
      // edit produit
      this.produitservice.editProduit(this.produit).subscribe(
        (response) => {              //  fonction fléchée // reponse du BE
          console.log("here response from BE after edit", response)
          this.produit=response           //  mettez à jour la propriété this.produit avec la nouvelle valeur du produit.
        }
      );
    } else {*/
      // add produit
      this.produitservice.addProduit(this.produit).subscribe(
        ()=> {
          this.router.navigate(["listproduit"]);
        }
      )
    }   
  }


