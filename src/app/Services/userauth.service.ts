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
    return this.httpClient.get(this.user_url+'/session-data',this.options).subscribe((data: any) => {
      if (data) {
        localStorage.setItem('user',JSON.stringify(data));
      } else {
console.log('lougha');

      }
    });;
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
    return this.httpClient.post<{ message: any, user: any,token:any }>(`${this.user_url}/login`, user).pipe(
      map((res) => {
        if (res.user) {
          localStorage.setItem("connectedUser", JSON.stringify(res.user));
          console.log(res.token);
          console.log(res.message);
          
          this.authlist.next(res.user);
          if (res.user.role==="admin") {
            this.router.navigate(['/dash']);
          } else {
            this.router.navigate(['/list']);
          }
        }
        return res;
      })
    );
  }

  loginSuccess(): Observable<{ message: any, user: any }> {
    const openedWindow = window.open("http://localhost:3000/auth/google", "_self");
  
    if (openedWindow) {
      console.log("wselette");
      
      return new Observable((observer) => {
        openedWindow.addEventListener('beforeunload', () => {
          // Effectuez vos actions ici après que la fenêtre est fermée
          const connectedUser = JSON.parse(localStorage.getItem("connectedUser") || '{}');
          if (connectedUser && connectedUser.role === "admin") {
            this.router.navigate(['/dash']);
          } else {
            this.router.navigate(['/list']);
          }
  
          // Vous pouvez émettre n'importe quelle valeur ici, ajustez en fonction de vos besoins
          const emittedValue = { message: 'Votre message', user: connectedUser };
  
          // Émettez la valeur souhaitée via l'observable
          observer.next(emittedValue);
          observer.complete();
        });
      });
    } else {
      // Retournez un observable avec une valeur null si la fenêtre ne peut pas être ouverte
      return of({ message: null, user: null });
    }
  }

  serviceToHeader(){
    return this.authlist.asObservable()
  }
  logout(){ 
    this.router.navigate(['/auth'])

    localStorage.removeItem("connectedUser")
    this.authlist.next("")
  }
  modifierUser(email:any,user:any){
   return this.httpClient.put<{message:any}>(this.user_url,{email,user});


  }
  addLivreur(user: any) {
    return this.httpClient.post("http://localhost:3000/livreur/signup", user).pipe(
      switchMap((res:any) => {console.log(res);
          
        if (res.livreur) {
          
          return this.loginLivreur(user).pipe(
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


  loginLivreur(user: any){
    return this.httpClient.post<any>("http://localhost:3000/livreur/login", user).pipe(
      map((res) => {
        console.log(res);
        
        if (res.user) {
          localStorage.setItem("connectedUser", JSON.stringify(res.user));
          console.log(res.token);
          console.log(res.message);
          
          this.authlist.next(res.user);
          this.router.navigate(['/dash-liv']);
        }
        return res;
      })
    );
  }
}
