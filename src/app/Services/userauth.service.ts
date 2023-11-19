import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';
import { delay, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  user_url = "http://localhost:3000/auth"
  authlist=new Subject <string> ()
  
  constructor(private httpClient: HttpClient,private router:Router) { }
 options = { withCredentials: true };
 private loginAttempts: number = 0;
  private isBlocked: boolean = false;
  getUserData() {
    return this.httpClient.get(this.user_url+'/login/success',this.options);
  }
  /*
  login(username: string, password: string) {
    if (this.isBlocked) {
      return throwError({ success: false, message: 'Votre compte est bloqué. Réessayez plus tard.' });
    }

    if (username === 'demo' && password === 'password') {
      // Réinitialise les tentatives de connexion en cas de succès
      this.loginAttempts = 0;
      return of({ success: true, message: 'Connexion réussie' });
    } else {
      this.loginAttempts++;

      if (this.loginAttempts === 3) {
        this.isBlocked = true;
        return throwError({ success: false, message: 'Votre compte est bloqué. Réessayez dans 2 minutes.' }).pipe(delay(2000));
      } else if (this.loginAttempts === 4) {
        this.isBlocked = true;
        return throwError({ success: false, message: 'Votre compte est bloqué. Réessayez dans 5 minutes.' }).pipe(delay(5000));
      } else if (this.loginAttempts >= 5) {
        this.isBlocked = true;
        return throwError({ success: false, message: 'Votre compte est bloqué. Réessayez dans 30 minutes.' }).pipe(delay(30000));
      }

      return throwError({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  }*/
  addUser(user: any) {
    return this.httpClient.post(`${this.user_url}/sign-up`, user).pipe(
      switchMap((res:any) => {
        if (res.user) {
          return this.loginUser(user).pipe(
            map((loginRes) => {
              return { message: res.message, user: loginRes.user };
            })
          );
        } else {
          return of(res);
        }
      })
    );
  }
  loginUser(user:any): Observable<{ message: any, user: any }> {
    return this.httpClient.post<{ message: any, user: any }>(`${this.user_url}/login`, user).pipe(
      map((res) => {
        if (res.user) {
          localStorage.setItem("connectedUser", JSON.stringify(res.user));
          this.authlist.next(res.user.role);
          if (res.user.role==="admin") {
            this.router.navigate(['/dash']);
          } else {
            this.router.navigate(['/home']);
          }
        }
        return res;
      })
    );
  }

  serviceToHeader(){
    return this.authlist.asObservable()
  }
  logout(){ 
    this.router.navigate([''])

    localStorage.removeItem("connectedUser")
    this.authlist.next("")
  }
}
