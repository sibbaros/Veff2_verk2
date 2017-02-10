import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username : string;
  loginFailed: boolean = false;

  constructor(private chatService : ChatService) { }

  ngOnInit() {
  }

   onLogin(){
    /*this.socket.emit("adduser", this.username, succeeded=>{
      if(!succeeded){
        this.loginFailed = true;
      } else {
        console.log("Login succeded!")
      }*/
    });
  }

}
