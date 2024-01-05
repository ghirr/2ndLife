// cart.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  //private cart = JSON.parse(localStorage.getItem('objets') || '[]');;
  public countSubject = new Subject<String>();


  getCount() {
   return this.countSubject.asObservable();
  }
  addPanier(objet:any){
     // Retrieve existing data from local storage
    let panier = JSON.parse(localStorage.getItem("objets") || '[]');
  
    // Append the new object to the existing data
    for (let i = 0; i < panier.length; i++) {
      if(objet._id===panier[i]._id){
       return
      }
      
    }
    panier.push(objet)
    // Store the updated data back in local storage
    localStorage.setItem("objets", JSON.stringify(panier));
    this.countSubject.next(panier.length);
    console.log(this.countSubject);
    
    this.getCount();
  }

  deleteFromPanier(objet:any){
      // Retrieve existing data from local storage
      
      let panier = JSON.parse(localStorage.getItem("objets") || '[]');
  
      // Append the new object to the existing data
      for (let i = 0; i < panier.length; i++) {
        if(objet._id===panier[i]._id){
         panier.splice(i,1)
        }
        
      }
      
      // Store the updated data back in local storage
      localStorage.setItem("objets", JSON.stringify(panier));
      this.countSubject.next(panier.length);
      console.log(this.countSubject);
      
      this.getCount();
  }

}
