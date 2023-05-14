import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  constructor(private http:HttpClient) { }

  userData: any;
  token = sessionStorage.getItem('auth_token')

  signUp(username: string, email: string, password: string) {
    let body = { username: username, password: password, email: email };
    return this.http.post('https://localhost:3000/signup', body);
  }

  signIn(email: string, password: string) {

    let body = { email: email, password: password };
    return this.http.post('https://localhost:3000/signin', body);
  }
}
