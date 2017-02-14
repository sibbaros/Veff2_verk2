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
  users: string[];
  chatForm: string;
  room: string;
  user: string;
  privateMessage = false;
  kicked: boolean;

  ngOnInit() {
    this.room = 'lobby';
    this.messages = [];
    this.kicked = false;
    this.chatService.getUsers().subscribe(list => {
      this.users = list;
      this.users.push(this.user);
    });
  }

  submitMessage() {
      this.messages.push(this.chatForm);
      let param = {
        roomName: this.room,
        msg: this.chatForm
      }
      this.chatService.sendMessage(param).subscribe(value => {
        console.log('message in room component');
        this.messages.push(this.chatForm);
     });
     this.chatForm = '';
  }

  onKickUserOut() {
    const userInfo = {user: this.user, room: this.room};

    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      console.log('kick user success!');
       this.kicked = true;
       this.router.navigate(['/rooms']);
    });
  }

  onBanUser() {
    const userInfo = {user: this.user, room: this.room};

    this.chatService.banUser(userInfo).subscribe(succeeded => {
      console.log('ban user success!');
    });
  }

  onPartRoom() {

    this.chatService.partRoom(this.room).subscribe(success => {
      console.log(this.room);
      console.log('parting success!');
      this.router.navigate(['/rooms']);

    });
  }

}
