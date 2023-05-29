import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  BridgeService {

  constructor(private http:HttpClient) { }

  userData: any;
  token = sessionStorage.getItem('auth_token');
  baseURL: string = "https://beb-blocky-ide.vercel.app";

  signUp(username: string, email: string, password: string) {
    let body = { username: username, password: password, email: email };
    return this.http.post( this.baseURL + '/signup', body );
  }

  signIn(username: string, password: string) {

    let body = { username: username, password: password };
    return this.http.post( this.baseURL + '/signin', body );
  }

  getSlides() {
    console.log("here");
    return this.http.get( this.baseURL + '/slides');
  }

  getSlide(id: number) {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    return this.http.get( this.baseURL + '/slides/' + id.toString(), {headers: header});
  }

  getSlideProgress(id: number) {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    console.log(header);
    return this.http.get( this.baseURL + '/slides/' + id.toString() + '/progress', {headers: header});
  }

  updateProgress(id: number, percent: number): void {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    this.http.post(this.baseURL + `slides/${id}/${percent}`, { headers: header });
  }
}
