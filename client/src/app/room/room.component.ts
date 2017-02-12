import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router) { }
  //rooms : string[]
  messages: string[];
  chatForm: string;
  room: string;
  privateMessage: boolean = false;

  ngOnInit() {
    this.room = 'lobby';
      //this.chatService.sendMessage(this.room, this.chatForm).subscribe(observer => {
     // this.messages.push("hi");
     // this.rooms.push("new room");
  //  })
    this.messages = [];
  }

  submitForm() {
      this.messages.push(this.chatForm);
      this.room = 'lobby';
      this.chatService.sendMessage(this.room, this.chatForm).subscribe(value => {
        console.log('message in room component');
  //  this.messages.push(this.chatForm);
     });
     this.chatForm = '';
  }

  onKickUserOut(username){
    
  }

  onPartRoom() {

    this.chatService.partRoom(this.room).subscribe(success => {
      console.log('parting success!');
      this.router.navigate(['/rooms']);

    });
  }

}
