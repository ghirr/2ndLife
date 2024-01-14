import { Component, OnInit } from '@angular/core';
import { PayementService } from 'src/app/Services/payement.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { UserauthService } from 'src/app/Services/userauth.service';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent implements OnInit{
deleteProduit(id: any) {
 this.objetService.deleteProduit(id).subscribe((res)=>{
  this.getAllObjets();
 })
}
deleteLivreur(id: any) {
 this.userService.deleteLivreur(id).subscribe((res)=>{
  this.getAllLivreurs();
 })
}
  Users:Array<any>=[];
  Livreurs:any=[];
  Objets:any=[];
  livraisons:any=[];
  constructor(private userService:UserauthService,private objetService:ProduitService,private livraisonService:PayementService){}
  ngOnInit() {
    this.getAllUsers();
    this.getAllLivreurs();
    this.getAllObjets();
    this.getAllLivraisons();
  }
getAllUsers(){
this.userService.getAllUsers().subscribe((res)=>{
  
  this.Users=res.users;
  console.log(this.Users);
  
})
}
getAllLivreurs(){
  this.userService.getAllLivreurs().subscribe((res)=>{
    this.Livreurs=res.livreurs;
    console.log(this.Livreurs);
    
  })
}
getAllObjets(){
  this.objetService.getLatestProduit().subscribe((res)=>{
    this.Objets=res.objets;
    console.log(this.Objets);
    
  })
}
getAllLivraisons(){
  this.livraisonService.getAllLivraisons().subscribe((res)=>{
    this.livraisons=res.livraisons;
    console.log(this.livraisons);
    
  })
}
}
