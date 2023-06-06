import { Injectable } from '@angular/core';
import { HttpClient}   from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router } from '@angular/router';
import jwtDecode from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin:any;
  constructor(private _http : HttpClient, private _router : Router) {
   }


  logged()
  {
      let token = localStorage.getItem("token");
      if(token)
      {
        this.isLogin = true;
      }
      else
      {
        this.isLogin = false;
      }
  }


  canActivate():boolean | Observable<boolean>
   {
     let token  = localStorage.getItem("token");
     if(token)
     {
        return true;
     }
     this._router.navigateByUrl("/user/login")
         return false;
   }


  isAdmine:boolean = false;
  saveCrrentUser()
  {
    let encryptedToken:any = localStorage.getItem("token");
    console.log(encryptedToken);
    let decriptedToken:any = jwtDecode(encryptedToken);
    localStorage.setItem("isAdmin",decriptedToken.isAdmin);
  }

  signUp(signData:any):Observable<any>
  {
     return this._http.post('http://localhost:5000/register',signData);
  }

  login(loginData:any):Observable<any>
  {
    return this._http.post('http://localhost:5000/login',loginData);
  }
}