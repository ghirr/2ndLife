import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  prodURL:string="http://localhost:3000/objet/";

  constructor(private httpClient:HttpClient) { }
  getAllProduit(){
    return this.httpClient.get<{ objets: any }>(this.prodURL);
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
    formData.append('name', produit.name);
  //  formData.append('catagorie', produit.catagorie);
    formData.append('description', produit.description);
    formData.append('price', produit.price);
    formData.append('adresse', produit.adresse);
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
    formData.append('name', produit.name);
  //  formData.append('catagorie', produit.catagorie);
    formData.append('description', produit.description);
    formData.append('price', produit.price);
    formData.append('adresse', produit.adresse);
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
