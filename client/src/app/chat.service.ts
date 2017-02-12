import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  socket: any;

  constructor() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function(){
      console.log('connect');
    });
  }

  login(username: string): Observable<boolean> {
      const observable = new Observable(observer => {
        this.socket.emit('adduser', username, succeeded => {
          console.log('login received');
          observer.next(succeeded);
        });
      });

      return observable;
  }

  getRoomList(): Observable<string[]> {
    const observable = new Observable(observer => {
      this.socket.emit('rooms');
      this.socket.on('roomlist', (list) => {

        const strArr: string[] = [];
        for(let x in list) {
          strArr.push(x);
        }
        observer.next(strArr);
      });
    });

    return observable;
  }

  joinRoom(room): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('joinroom', room, succeeded => {
        console.log('joinRoom chat service');
        this.socket.emit('updateusers');
        this.socket.emit('updatetopic');
        this.socket.emit('servermessage', 'join');
        // if new room is being added:
        this.socket.emit('updatechat');
      });
      observer.next(room);
    });
    return observable;
  }

  sendMessage(roomName: string, message: string): Observable<string> {
    const observable = new Observable(observer => {
        this.socket.emit('sendmsg', roomName, message);/*  succeeded => {*/
          console.log('message received');
          this.socket.emit('updatechat');
       // });
        observer.next(message);
        });
    return observable;
  }

  // laga þetta fall: 
  partRoom(room): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('partroom', room);
        console.log('partRoom chat service');
        this.socket.emit('updateusers');
        this.socket.emit('servermessage', 'part');
        let success = true;
      observer.next(success);
    });
    return observable;
  }

   disconnect(): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('disconnect');
      observer.next();
    });
    return observable;
  }

}

 
