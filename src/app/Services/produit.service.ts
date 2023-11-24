import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  prodURL:string="http://localhost:8080/api/products";

  constructor(private httpClient:HttpClient) { }
  getAllProduit(){
    return this.httpClient.get(this.prodURL);
  }

  getProduitById(id: any){
    return this.httpClient.get(`${this.prodURL}/${id}`)
  }

  deleteProduit(id: any){
    return this.httpClient.delete(`${this.prodURL}/${id}`);
  }

  addProduit(produit: any){
    return this.httpClient.post(this.prodURL, produit);
  }

  editProduit(produit: any ){
    return this.httpClient.put(`${this.prodURL}/${produit.id}`, produit);
  }

}
