import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  /**
  Declare socket and connected BS to push values to
  **/
  private socket: any;
  connected$ = new BehaviorSubject<boolean>(false);

  /**
  Initialize socket connection to server and create connect
  and disconnect events
  **/
  constructor() {
    this.socket = io(environment.baseSocket);
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  /**
  Join user to specific room 
  **/
  join(room: string) {
    // auto rejoin after reconnect mechanism
    this.connected$.subscribe((connected) => {
      if (connected) {
        this.socket.emit('join', { room });
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  /**
  Emit any event to server 
  **/
  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  /**
  Listen for any event from server 
  **/
  listen(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }
}
