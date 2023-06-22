import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  BridgeService {
  progress: any;

  constructor(private http:HttpClient) { }

  userData: any;
  token = sessionStorage.getItem('auth_token');
 // baseURL: string = "https://beb-blocky-ide.vercel.app";
 baseURL: string = "http://localhost:4000";
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
      'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
    };

    return this.http.get(this.baseURL + '/slides/' + id.toString() + '/progress', { headers: header }).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'Progress not found') {
          // Return a default value of 0 when progress is not found
          return of(0);
        }

        // Forward the error to the subscriber
        return throwError(error);
      })
    );
  }

  updateProgress(id: number, percent: number) {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    return this.http.post(this.baseURL + `/updateprogress/${id}/${percent}`, { headers: header });
  }
}
