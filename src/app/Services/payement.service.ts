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
}
