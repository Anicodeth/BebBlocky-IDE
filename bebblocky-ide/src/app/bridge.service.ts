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
    return this.http.post('https://beb-blocky-ide.vercel.app/signup', body);
  }

  signIn(username: string, password: string) {

    let body = { username: username, password: password };
    return this.http.post('https://beb-blocky-ide.vercel.app/signin', body);
  }
}
