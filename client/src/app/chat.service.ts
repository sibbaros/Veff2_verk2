import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatService {
  socket : any;


  constructor() { 
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", function(){
      console.log("connect")
    });
  }

  login(username : string) : Observable<boolean> {
      let observable = new Observable(observer => {
        this.socket.emit("adduser", username, succeeded=>{
          console.log("login received");
          observer.next(succeeded);
        });
      });

      return observable;
  }

  getRoomList() : Observable<string[]> {
    let observable = new Observable(observer => {
      this.socket.emit("rooms");
      this.socket.on("roomlist", (list) => {

        let strArr: string[] = [];
        for(var x in list){
          strArr.push(x);
        }
        observer.next(strArr);
      })
    });

    return observable;
  }

}
