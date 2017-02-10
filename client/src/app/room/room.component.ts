import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private chatService: ChatService) { }
  //rooms : string[]
  messages : string[]
  chatForm : string

  ngOnInit() {
      this.chatService.sendMessage(this.chatForm).subscribe(observer => {
     // this.messages.push("hi");
     // this.rooms.push("new room");
    })
    this.messages = [];
  }

  submitForm(){
      this.messages.push(this.chatForm);
      this.chatService.sendMessage(this.chatForm).subscribe(value => {
      console.log("message in room component");
  //  this.messages.push(this.chatForm);
     });
  }

}
