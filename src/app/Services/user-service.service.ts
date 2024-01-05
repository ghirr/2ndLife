import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/livreur'; 

  constructor(private http: HttpClient) {}


  

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`); 
  }


}
