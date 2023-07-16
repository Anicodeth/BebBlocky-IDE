import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PythonService {
  public socket: Socket

  constructor() {
    this.socket = io('https://beb-blocky-ide.vercel.app');
  }


}
