import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

declare const loadPyodide: any;

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  

  constructor(private socket: Socket) {
    this.socket = io('http://localhost:3001');
  }

  get pythonSocket() {
    return this.socket;
  }


}
