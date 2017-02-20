import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  messages: [{}];
  users: string[];
  chatForm: string;
  privateForm: string;
  room: string;
  kickedUser: string;
  privateMessage = false;
  privateMessages =[];
  user: string;
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.route.snapshot.params['id'];
    this.user = this.chatService.username;
    this.chatService.sendMessage(this.room, "Hi, I'm new!").subscribe(value => {
        this.messages = value;
     });

    this.chatService.privateMessage(this.user, "This is where your private messages will apear!").subscribe(value => {
      this.privateMessages.push(value);
      console.log("private messages: " + this.privateMessages);
    })
  
    this.chatService.getUsers(this.room).subscribe(list => {
      this.users = list;
    });

    const userInfo = {user: this.kickedUser, room: this.room};
    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      if (succeeded === this.user) {
          this.router.navigate(['/rooms']);
      }
    });
    
  /*  this.chatService.privateMsg().subscribe(value => {
        console.log("value: " + value);
    });*/

    this.chatService.ban().subscribe(banned => {
      if (banned === this.user){
        this.router.navigate(['/rooms']);
      }
    });
  }

  submitMessage() {
      this.chatService.sendMessage(this.room, this.chatForm).subscribe(value => {
        this.messages = value;
     });
     this.chatForm = '';
  }

  submitPrivateMessage() {
    console.log("this private form: " + this.privateForm);
    this.chatService.privateMessage(this.privateForm, this.chatForm).subscribe(value => {
      console.log('this is private');
      this.privateMessages.push(value);

    });
  }

  onKickUserOut() {
    const userInfo = {user: this.kickedUser, room: this.room};

    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      if (succeeded) {
         this.chatService.sendMessage(this.room, this.kickedUser + ' has been kicked out of the room').subscribe(value => {
          this.messages = value;
        });
      }
     this.kickedUser = '';
    });

  }

  onBanUser() {
    const userInfo = {user: this.kickedUser, room: this.room};

    this.chatService.banUser(userInfo).subscribe(succeeded => {
      if (succeeded) {
         this.chatService.sendMessage(this.room, this.kickedUser + ' has been banned from the room').subscribe(value => {
          this.messages = value;
      });
    }
         this.kickedUser = '';

    });
  }

  onPartRoom() {

    this.chatService.partRoom(this.room).subscribe(success => {
      this.router.navigate(['/rooms']);

    });
  }

}
