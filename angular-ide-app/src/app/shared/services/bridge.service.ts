import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { User } from '../models/user.dto';
import { Course } from '../models/course.dto';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  progress: any

  constructor(
    private http: HttpClient
  ) { }

  user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  token: String = sessionStorage.getItem('auth_token')!;

  baseUrl: String = 'https://beb-blocky-ide.vercel.app';
  // baseUrl: String = 'http://localhost:4000'; // - Development only

  resourcesBaseURL: String = this.baseUrl + '/api/v1';
  authBaseUrl: String = this.baseUrl + '/auth/v1';

  signUp(username: string, email: string, password: string) {
    const body = { username: username, password: password, email: email };
    return this.http.post(this.authBaseUrl + '/signup', body).pipe(
      catchError((error) => {
        if (error.error.message == "Another user exists with the same username.") {
        // if ('username' error.error.message) {
          return throwError("That username is taken. Please pick another username.");
        } else if (error.error.message == "Another user exists with the same email.") {
          return throwError("That email is associated with another account. Please pick another email.");
        } else {
          return throwError("Something went wrong. Please try again.");
        }
      })
    );
  }

  signIn(username: string, password: string): Observable<User> {
    const body = { username: username, password: password };
    return this.http.post<User>(this.authBaseUrl + '/signin', body).pipe(
      tap((data: any) => {
        this.user = data.user;
        sessionStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem('auth_token', data.token);
        sessionStorage.setItem("courseProg", JSON.stringify(data.user.progress));
      }),
      catchError((error) => {
        if (error.status == 400) {
          return throwError("Invalid username or password");
        } else if (error.status == 404) {
          return throwError("User does not exist. Please sign up.");
        } else {
          return throwError("Something went wrong. Please try again.");
        }
      })
    );
  }

  // signIn(username: string, password: string): Observable<User> {
  // const body = { username: username, password: password };
  // return this.http.post<User>(this.authBaseUrl + '/signin', body);

  // return response.pipe(
  //   tap((data: any) => {
  //     this.user = data.user;
  //     sessionStorage.setItem('user', JSON.stringify(data.user));
  //     sessionStorage.setItem('auth_token', data.token);
  //     sessionStorage.setItem("courseProg", JSON.stringify(data.user.progress));
  //   }),
  //   catchError((error) => {
  //     // Handle the error here
  //     if (error.status == 401) {
  //       this.logout();
  //       this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
  //       this.token = sessionStorage.getItem('auth_token')!;
  //     } else {
  //       this.logout();
  //       this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
  //       this.token = sessionStorage.getItem('auth_token')!;
  //     }

  //     // You can also show user-friendly error messages here if required

  //     // Re-throw the error to propagate it to the subscriber
  //     return throwError(error);
  //   })
  // );
  // }

  getCourseProgress(courseId: number) {
    // find the courseId from the session storage "courseProg" and return the progress
    let courseProg = JSON.parse(sessionStorage.getItem("courseProg") || '{}');

    // course id might not be the exact index of the course in the array so we need to find it and return it
    for (let i = 0; i < courseProg.length; i++) {
      if (courseProg[i].courseId == courseId) {
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
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.user;
  }

  getCourses(type: string): Observable<Course[]> {
    if (!type) {
      return this.http.get<Course[]>(this.resourcesBaseURL + '/courses/');
    }
    return this.http.get<Course[]>(this.resourcesBaseURL + '/courses/' + type);
  }

  getUserCourses(type: string): Observable<Course[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });

    if (!type) {
      return this.http.get<Course[]>(this.resourcesBaseURL + '/user/courses', { headers: headers });
    }
    return this.http.get<Course[]>(this.resourcesBaseURL + '/user/courses/' + type, { headers: headers });
  }

  getCourse(id: number): Observable<Course> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.get<Course>(this.resourcesBaseURL + '/courses/' + id.toString(), { headers: headers });
  }

  deleteCourse(id: number): Observable<Course> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
      return this.http.delete<Course>(this.resourcesBaseURL + '/courses/' + id.toString(), { headers: headers }).pipe(
        catchError((error) => {
          if (error.status == 401) {
            return throwError("You are not authorized to delete this course.");
          } else if (error.status == 404) {
            return throwError("Course does not exist.");
          } else {
            return throwError("Something went wrong. Please try again.");
          }
        }
      ));
  }

  updateCourseProgress(id: number, percent: number): any {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post(this.resourcesBaseURL + `/user/courses/${id}/progress`, { completedPercent: percent }, { headers: headers });
  }

  updateLastAccessedCourseId(id: number): any {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post(this.resourcesBaseURL + `/user/courses/last-accessed`, { courseId: id }, { headers: headers });
  }

  getLastAccessedCourseId() {
    return this.user.lastAccessedCourseId;
  }

  createCourse(course: Course | Object): Observable<Course> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.post<Course>(this.resourcesBaseURL + '/courses', course, { headers: headers });
    // Todo: Handle errors
  }

  updateCourse(courseId: number, course: Course | Object): Observable<Course> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}` });
    return this.http.put<Course>(this.resourcesBaseURL + '/courses/' + courseId.toString(), course, { headers: headers });
    // Todo: Handle errors
  }
}
