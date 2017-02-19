import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class ChatService {

  socket: any;
  username: string;

  constructor(private router: Router) {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function(){
      console.log('connect');
    });
  }

  login(username: string): Observable<boolean> {
      const observable = new Observable(observer => {
        this.socket.emit('adduser', username, succeeded => {
          console.log('login received');
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

   getUsers(room: string): Observable<string[]> {
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
      this.socket.on('updateusers', (room, roomUsers, roomCreator) => {
       /* const arr = [{ }];
        for (let i = 0; i< roomUsers.length; i++) {
          arr[i] = roomUsers[i].users
        }*/
        console.log("room users: " + roomUsers[0]);
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

  privateMessage(username: string, message: string): Observable<string> {
     const observable = new Observable(observer => {
       const param = {
         nick: username,
         message: message
       };
       this.socket.emit('privatemsg', param, succeeded => {
          observer.next(succeeded);
          console.log('sending the private message!');
       });

      });
      return observable;
  }

  // laga þetta fall:
  partRoom(room): Observable<boolean> {
    const observable = new Observable(observer => {
      this.socket.emit('partroom', room);
        console.log('partRoom chat service');
       // this.socket.emit('updateusers');
       // this.socket.emit('servermessage', 'part');
        const success = true;
      observer.next(success);
    });
    return observable;
  }

  kickUserOut(userInfo): Observable<any> {
    console.log("kicked User userinfo: " + userInfo);
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

   banUser(userInfo): Observable<any> {
     console.log("userInfo: " + userInfo);
    const observable = new Observable(observer => {
      this.socket.emit('ban', userInfo, succeeded => {
        console.log('ban succeeded!');
        observer.next(succeeded);
      });
      this.socket.on('banned', (room, banned, banner) => {
        console.log('banned: ' + banned);
        console.log("banner: " + banner);
         // observer.next(banned);
      });
    });

    return observable;
  }

   disconnect(): Observable<boolean> {
     console.log('in disconnect');
    const observable = new Observable(observer => {
      this.socket.emit('disconnect');
      observer.next();
    });
    return observable;
  }

  updateUsers(room: string, user: string[], owner: string): Observable<string[]> {
    const observable = new Observable(observer => {
      this.socket.emit('updateusers');
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
}


/*
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class ChatService {

  socket: any;
  username: string;

  constructor(private router: Router) {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function(){
      console.log('connect');
    });
  }

  login(username: string): Observable<boolean> {
      const observable = new Observable(observer => {
        this.socket.emit('adduser', username, succeeded => {
          console.log('login received');
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

   getUsers(room: string): Observable<string[]> {
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

  privateMessage(username: string, message: string): Observable<string> {
     const observable = new Observable(observer => {
       const param = {
         nick: username,
         message: message
       };
       this.socket.emit('privatemsg', param, succeeded => {
          observer.next(succeeded);
          console.log('sending the private message!');
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
   banUser(userInfo): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.emit('ban', userInfo, succeeded => {
        observer.next(succeeded);
      });
      this.socket.on('banned', (room, bannedUser, banner) => {
        console.log("banned is " + bannedUser);
        console.log("banner is" + banner);
        observer.next(bannedUser);
      })
    });

    return observable;
  }

   disconnect(): Observable<boolean> {
     console.log('in disconnect');
    const observable = new Observable(observer => {
      this.socket.emit('disconnect');
      observer.next();
    });
    return observable;
  }

  updateUsers(room: string, user: string[], owner: string): Observable<string[]> {
    const observable = new Observable(observer => {
      this.socket.emit('updateusers');
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
}
*/