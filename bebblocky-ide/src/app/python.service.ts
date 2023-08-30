import { Injectable } from '@angular/core';
import Pusher  from 'pusher-js';
import { BridgeService } from './shared/services/bridge.service';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PythonService {
  public channel;
  public pusher;
  public compiled = new Subject<any>;
  
  


  constructor(private bridgeService: BridgeService) {
     this.pusher = new Pusher('54bd977b9f1757fcfb9a', {
      cluster: 'us3'
    });
    
    this.channel = this.pusher.subscribe('my-channel');

    // Bind to an event
     }

    run(code:string){
      this.bridgeService.runCode(code).subscribe((data:any) => {
        this.compiled.next(data);
            });

      // this.channel.bind('my-event', (data:any) => {
      //   console.log(data);
      // }); 
    }




}
