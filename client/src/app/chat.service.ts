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

  joinRoom(room) : Observable<boolean> {
    console.log("hi1");
    let observable = new Observable(observer => {
      console.log("hi2")
      this.socket.emit("joinroom", room.id, succeeded =>{
        console.log("joinRoom chat service");
        this.socket.emit("updatechat");
       // this.socket.emit("updateusers");
        this.socket.emit("updatetopic");
      } 
      
      );
      observer.next(room);

    })
    return observable;
  } 

  sendMessage(roomID : string) : Observable<string> {
    let observable = new Observable(observer => {

       /* this.socket.emit("sendmsg", "3", succeeded=>{
          console.log("message received");
          this.socket.emit("updatechat");
        }, (true));*/
       // this.socket.emit("sendmsg", {roomName: "the room identifier", msg: "The message itself, only the first 200 chars are considered valid" });
                 console.log("message received");

        observer.next(roomID);
        });
    return observable;
  }

}

