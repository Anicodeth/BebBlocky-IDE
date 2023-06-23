import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { User } from '../models/user.dto';
import { Slide } from '../models/slide.dto';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  progress: any;

  constructor(private http: HttpClient) { }

  userData: User | any;
  token = sessionStorage.getItem('auth_token');

  resourcesBaseURL = 'http://beb-blocky-ide.vercel.app/api/v1';
  authBaseUrl = 'http://beb-blocky-ide.vercel.app/auth/v1';

  signUp(username: string, email: string, password: string) {
    const body = { username: username, password: password, email: email };
    return this.http.post(this.authBaseUrl + '/signup', body);
  }

  signIn(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    const response = this.http.post<User>(this.authBaseUrl + '/signin', body);

    return response.pipe(
      tap((data: User) => {
        this.userData = data;
        sessionStorage.setItem('auth_token', data.token);
      })
    );
  }

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(this.resourcesBaseURL + '/slides');
  }

  getUserSlides(): Observable<Slide[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.get<Slide[]>(this.resourcesBaseURL + '/user/slides', { headers: headers });
  }

  getSlidesByType(type: string): Observable<Slide[]> {
    if (!type) {
      return this.getSlides();
    } else if (type === 'my') {
      return this.getUserSlides();
    }
    return this.http.get<Slide[]>(this.resourcesBaseURL + '/slides/' + type);
  }

  getSlide(id: number): Observable<Slide> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.get<Slide>(this.resourcesBaseURL + '/slides/' + id.toString(), { headers: headers });
  }

  getSlideProgress(id: number): Observable<number> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.get<number>(this.resourcesBaseURL + '/user/slides/' + id.toString() + '/progress', { headers: headers }).pipe(
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

  updateSlideProgress(id: number, percent: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post(this.resourcesBaseURL + `/user/slides/${id}/progress`, { completedPercent: percent }, { headers: headers });
  }
}