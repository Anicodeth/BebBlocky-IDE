import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { User } from '../models/user.dto';
import { Slide } from '../models/slide.dto';
import { DashboardLoadingService } from './dashboard-loading.service';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  progress: any;

  constructor(
    private http: HttpClient,
    private loadingService: DashboardLoadingService
    ) { }

  user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  token: String = sessionStorage.getItem('auth_token')!;

  baseUrl: String = 'http://beb-blocky-ide.vercel.app';
  resourcesBaseURL: String = this.baseUrl + '/api/v1';
  authBaseUrl: String = this.baseUrl + '/auth/v1';

  signUp(username: string, email: string, password: string) {
    const body = { username: username, password: password, email: email };
    return this.http.post(this.authBaseUrl + '/signup', body);
  }

  signIn(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    const response = this.http.post<User>(this.authBaseUrl + '/signin', body);

    return response.pipe(
      tap((data: any) => {
        this.user = data.user;
        sessionStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem('auth_token', data.token);
        sessionStorage.setItem("courseProg", JSON.stringify(data.user.progress));
      })
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('auth_token');
  }

  getUser() {
    if (!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    }

    return this.user;
  }

  getSlides(type: string): Observable<Slide[]> {
    if (!type) {
      return this.http.get<Slide[]>(this.resourcesBaseURL + '/slides/');
    }
    return this.http.get<Slide[]>(this.resourcesBaseURL + '/slides/' + type);
  }

  getUserSlides(type: string): Observable<Slide[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });

    if (!type) {
      return this.http.get<Slide[]>(this.resourcesBaseURL + '/user/slides', { headers: headers });
    }
    return this.http.get<Slide[]>(this.resourcesBaseURL + '/user/slides/' + type, { headers: headers });
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
