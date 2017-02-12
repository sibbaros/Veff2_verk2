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

        const strArr: string[] = [ ];
        for (let x in list) {
          strArr.push(x);
        }
        observer.next(strArr);
      });
    });

    return observable;
  }

   getUsers(): Observable<string[]> {
    const observable = new Observable(observer => {
      this.socket.emit('users');
      this.socket.on('userlist', (list) => {

        const strArr: string[] = [ ];
        for (let x in list) {
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
        this.socket.emit('updateusers');
        this.socket.emit('updatetopic');
        this.socket.emit('servermessage', 'join');
        // if new room is being added:
        this.socket.emit('updatechat');
        observer.next(succeeded);
      });
      console.log('joinRoom chat service');
      observer.next(room);
    });
    return observable;
  }

  sendMessage(roomName: string, message: string): Observable<string> {
    const observable = new Observable(observer => {
        this.socket.emit('sendmsg', roomName, message); /*  succeeded => {*/
          console.log('message received');
          this.socket.emit('updatechat');
       // });
        observer.next(message);
        });
    return observable;
  }

  privarMessage(username: string, message: string): Observable<string> {
     const observable = new Observable(observer => {

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
        const success = true;
      observer.next(success);
    });
    return observable;
  }

  kickUserOut(userInfo): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('kick', userInfo, succeeded => {
        console.log('kick succeeded!');
        observer.next(succeeded);
      });
    });

    return observable;
  }
   banUser(userInfo): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('ban', userInfo, succeeded => {
        console.log('ban succeeded!');
        observer.next(succeeded);
      });
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
