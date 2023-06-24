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

  constructor(
    private http: HttpClient
    ) { }

  user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  token: String = sessionStorage.getItem('auth_token')!;

  baseUrl: String = 'https://beb-blocky-ide.vercel.app';
  // baseUrl: String = 'http://localhost:3000';
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

  getSlideProgress(slideId: number) {
    // find the slideId from the session storage "courseProg" and return the progress
    let courseProg = JSON.parse(sessionStorage.getItem("courseProg") || '{}');
    // slide id might not be the exact index of the array so we need to find it and return it
    for (let i = 0; i < courseProg.length; i++) {
      if (courseProg[i].slideId == slideId) {
        return courseProg[i].completedPercent;
      }
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('auth_token');
  }

  setUser(): Observable<User> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    const response = this.http.post<User>(this.resourcesBaseURL + '/user', { headers: headers });

    return response.pipe(
      tap((data: any) => {
        this.user = data.user;
        sessionStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem("courseProg", JSON.stringify(data.user.progress));
      })
    );
  }

  getUser() {
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

  updateSlideProgress(id: number, percent: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post(this.resourcesBaseURL + `/user/slides/${id}/progress`, { completedPercent: percent }, { headers: headers });
  }

  updateLastAccessedSlideId(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post(this.resourcesBaseURL + `/user/slides/last-accessed`, { slideId: id }, { headers: headers });
  }

  getLastAccessedSlideId() {
    return this.user.lastAccessedSlideId;
  }

  createSlide(slide: Slide): Observable<Slide> {
    return this.http.post<Slide>(this.resourcesBaseURL + '/slides', slide);
  }
}
