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
        for (const x in list) {
          if (list.hasOwnProperty(x)) {
            strArr.push(x);
          }
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
        for (const x in list) {
          if (list.hasOwnProperty(x)) {
            strArr.push(x);
          }
        }
        observer.next(strArr);
      });
    });

    return observable;
  }

  joinRoom(roomName): Observable<boolean> {
    const observable = new Observable(observer => {
      const param = {
        room: roomName
      };
      this.socket.emit('joinroom', param, function(a, b) {
        observer.next(a);
      });
      console.log('joinRoom chat service');
    });
    return observable;
  }

  sendMessage(room: string, message: string): Observable<any> {
    const observable = new Observable(observer => {
        const param = {
          roomName: room,
          msg: message
        };
        this.socket.emit('sendmsg', param);
        this.socket.on('updatechat', (roomName, roomMessageHistory) => {        
          let arr = [{ }];
           
        for(let i = 0; i < roomMessageHistory.length; i++) {
          let x = {nick: roomMessageHistory[i].nick, 
                    message: roomMessageHistory[i].message};
          arr[i] = x;
        }
          observer.next(arr);
       });
    });
    return observable;
  }

  privateMessage(username: string, message: string): Observable<string> {
     const observable = new Observable(observer => {
       const param = {
         nick: username,
         message: message
       }
       this.socket.emit('privatemsg', param, succeeded => {
          observer.next(succeeded);
          console.log("sending the private message!");
       });

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
