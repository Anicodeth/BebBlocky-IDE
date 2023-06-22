import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
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
  resourcesBaseURL: string = "https://beb-blocky-ide.vercel.app/api/v1";
  authBaseUrl: string = "https://beb-blocky-ide.vercel.app/auth/v1";
  //resourcesBaseURL: string = "http://localhost:3000/api/v1";
  //authBaseUrl: string = "http://localhost:3000/auth/v1";
  signUp(username: string, email: string, password: string) {
    let body = { username: username, password: password, email: email };
    return this.http.post( this.authBaseUrl + '/signup', body );
  }

  signIn(username: string, password: string): any {
  let body = { username: username, password: password };
  let response = this.http.post(this.authBaseUrl + '/signin', body);

  return response.pipe(
    tap((data: any) => {
      this.userData = data;
      sessionStorage.setItem('auth_token', data.token);
    })
  );
}


  getSlides() {
    return this.http.get( this.resourcesBaseURL + '/slides');
  }

  getUserSlides() {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    return this.http.get( this.resourcesBaseURL + '/user/slides', { headers: header });
  }

  getSlidesByType(type: string) {
    if (!type) {
      return this.getSlides();
    } else if (type == 'my') {
      return this.getUserSlides();
    }
    return this.http.get( this.resourcesBaseURL + '/slides/' + type);
  }

  getSlide(id: number) {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    return this.http.get( this.resourcesBaseURL + '/slides/' + id.toString(), {headers: header});
  }

  getSlideProgress(id: number) {
    let header = {
      'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
    };

    return this.http.get(this.resourcesBaseURL + '/user/slides/' + id.toString() + '/progress', { headers: header }).pipe(
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

  updateSlideProgress(id: number, percent: number) {
    let header = {
      'Authorization':  `Bearer ${sessionStorage.getItem('auth_token')}`
    };
    return this.http.post(this.resourcesBaseURL + `/user/slides/${id}/progress`, { completedPercent: percent }, { headers: header });
  }
}
