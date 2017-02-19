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
  user: string;
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.route.snapshot.params['id'];
    this.user = this.chatService.username;
    this.chatService.sendMessage(this.room, "Hi, I'm new!").subscribe(value => {
        this.messages = value;
     });
     console.log("this user issss: " + this.user);
    this.chatService.getUsers(this.room).subscribe(list => {
      this.users = list;
    });

    const userInfo = {user: this.kickedUser, room: this.room};
    console.log("user info room cp: " + userInfo);
    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      console.log('succeeded: ' + succeeded);
      if (succeeded === this.user) {
          this.router.navigate(['/rooms']);
      }
    });

   /* this.chatService.banUser(userInfo).subscribe(succeeded => {
            console.log('succeeded: ' + succeeded);

     // if (succeeded === this.user) {
       //   this.router.navigate(['/rooms']);
     // }
    });*/
  }

  submitMessage() {
      this.chatService.sendMessage(this.room, this.chatForm).subscribe(value => {
        this.messages = value;
     });
     this.chatForm = '';
  }

  submitPrivateMessage() {
    this.chatService.privateMessage(this.user, this.privateForm).subscribe(value => {
      console.log('this is private');

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
      console.log('ban user success!');
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
      console.log(this.room);
      console.log('parting success!');
      this.router.navigate(['/rooms']);

    });
  }

}
