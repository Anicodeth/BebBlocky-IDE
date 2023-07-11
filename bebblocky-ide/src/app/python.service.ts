import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const loadPyodide: any;

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  private isLoaded = false;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    return this.http.get('https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js', { responseType: 'text' })
      .toPromise()
      .then(pyodideScript => {
        return new Promise<void>((resolve, reject) => {
          const script: any = document.createElement('script');
          script.textContent = pyodideScript;
          script.onload = () => {
            this.isLoaded = true;
            resolve();
          };
          script.onerror = () => {
            reject(new Error('Failed to load Pyodide.'));
          };
          document.head.appendChild(script);
        });
      });
  }


}
