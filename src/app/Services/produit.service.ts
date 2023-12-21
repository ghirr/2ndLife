import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  prodURL:string="http://localhost:3000/objet/";

  constructor(private httpClient:HttpClient) { }
  getAllProduit(): Observable<any>{
    return this.httpClient.get<{ objets: any }>(this.prodURL);
  }
  getProduitByUserEmail(email:any): Observable<any>{
    return this.httpClient.get<{ objets: any }>(`${this.prodURL}/own/${email}`);
  }

  getProduitById(id: any){
    return this.httpClient.get<{objet:any}>(`${this.prodURL}/${id}`)
  }

  deleteProduit(id: any){
    return this.httpClient.delete(`${this.prodURL}/${id}`);
  }

  addProduit(produit: any){
    console.log(produit);
    
    let formData:any = new FormData();
    formData.append('image', produit.image);
    formData.append('name', produit.prod.nom);
  //  formData.append('catagorie', produit.catagorie);
    formData.append('description', produit.prod.description);
    formData.append('price', produit.prod.prix);
    formData.append('adresse', produit.prod.adresse);
    formData.append('username', produit.user.name);
    formData.append('userphone', produit.user.phone);
    formData.append('useremail', produit.user.email);
    console.log(formData);
    /*
    const headers = new HttpHeaders();
    // Remove the following line as it doesn't set the correct content type for multipart form data
    // headers.set('enctype', 'multipart/form-data');

    // Instead, set the headers using the 'Content-Type' key
    headers.append('Content-Type', 'multipart/form-data');

    // Use the headers in the options object
    const options = { headers: headers };*/

    return this.httpClient.post<{ message: any }>(this.prodURL, formData).subscribe(
      (response) => {
        console.log(response);
        // Handle the response as needed
      },
      (error) => {
        console.error(error);
        // Handle errors appropriately
      }
    );
  }

  editProduit(produit: any ){
    console.log(produit);
    
    let formData:any = new FormData();
    formData.append('image', produit.image);
    formData.append('name', produit.prod.nom);
  //  formData.append('catagorie', produit.catagorie);
    formData.append('description', produit.prod.description);
    formData.append('price', produit.prod.prix);
    formData.append('adresse', produit.prod.adresse);
    console.log(formData);
    /*
    const headers = new HttpHeaders();
    // Remove the following line as it doesn't set the correct content type for multipart form data
    // headers.set('enctype', 'multipart/form-data');

    // Instead, set the headers using the 'Content-Type' key
    headers.append('Content-Type', 'multipart/form-data');

    // Use the headers in the options object
    const options = { headers: headers };*/

    return this.httpClient.put<{ message: any }>(`${this.prodURL}/${produit._id}`, formData).subscribe(
      (response) => {
        console.log(response);
        // Handle the response as needed
      },
      (error) => {
        console.error(error);
        // Handle errors appropriately
      }
    );
  }

}
