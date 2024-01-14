import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  URL:string="http://localhost:3000/vendre";
  constructor(private httpClient:HttpClient) { }

  checkProduit(ids: Array<String>):Observable<any>{
    return this.httpClient.post(this.URL,ids);
  }
  achatProduit(ids:Array<String>,user:any,livraison:Boolean){
    return this.httpClient.post<{ message: any }>("http://localhost:3000/vendre/achats",{ids,user,livraison}).subscribe();
  }
  getLivraison():Observable<any>{
    return this.httpClient.get<{ livraison: any }>(`${this.URL}/livraisons`)
  }
  mesLivraison(id:any,livreur:any){
    const requestData = { livreur: livreur };
    
    return this.httpClient.put<{message:any}>(`${this.URL}/livraisons/${id}`,requestData);
  }
  getMesLivraisons(livreur:any){
    return this.httpClient.get<{ livraison: any }>(`${this.URL}/livraisons/${livreur}`)
  }
  terminer(id:any){
    return this.httpClient.put<{message:any}>(`${this.URL}/livraisons/terminer/${id}`,{});
  }
  getAllLivraisons():Observable<any>{
    return this.httpClient.get(this.URL);
  }
}
