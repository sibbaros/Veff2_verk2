import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  socket : any;
  username : string;
  loginFaild: boolean = false;

  
  constructor(){
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", function(){
      console.log("connect")
    });
  }

  onLogin(){
    this.socket.emit("adduser", this.username, succeeded=>{
      if(!succeeded){
        this.loginFaild = true;
      }
    });
  }
}

