import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class ChatService {

  socket: any;
  username: string;
  banned = false;

  constructor(private router: Router) {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function(){
    });
  }

  login(username: string): Observable<boolean> {
      const observable = new Observable(observer => {
        this.socket.emit('adduser', username, succeeded => {
          this.username = username;
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
            strArr.push(list[x]);
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
          const arr = [{ }];
          for ( let i = 0; i < roomMessageHistory.length; i++ ) {
            const x = { nick: roomMessageHistory[i].nick,
                      message: roomMessageHistory[i].message };
            arr[i] = x;
        }
        if ( room === roomName ) {
          observer.next(arr);

        }
       });
    });
    return observable;
  }

  privateMessage(userName: string, theMessage: string): Observable<any> {
     const observable = new Observable(observer => {
       const param = {
         nick: userName,
         message: theMessage
       };
       this.socket.emit('privatemsg', param, succeeded => { });
         this.socket.on('recv_privatemsg', (username, message) => {
          const x = { user: username, msg: message};
          if (userName === this.username) {
            observer.next(x);
          }
       });
      });
      return observable;
  }

  partRoom(room): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('partroom', room);
        const success = true;
      observer.next(success);
    });
    return observable;
  }

  kickUserOut(userInfo): Observable<any> {
    const observable = new Observable(observer => {

      this.socket.emit('kick', userInfo, succeeded => {
        observer.next(succeeded);

      });
      this.socket.on('kicked', (room, user, sockets) => {
         observer.next(user);
      });
    });

    return observable;
  }

  ban(): Observable<any> {
    const observable = new Observable(observer => {
       this.socket.on('banned', (room, bannedUser, banner) => {
        if (bannedUser === this.username) {
          this.banned = true;
        }
        observer.next(bannedUser);
      });
    });

    return observable;
  }
     banUser(userInfo): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.emit('ban', userInfo, succeeded => {
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
