import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}


  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/signup`, user); 
  }


  login(user: any){
    return this.http.post<any>(`${this.apiUrl}/login`, user); 
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`); 
  }


}
