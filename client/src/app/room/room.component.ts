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
  privateMessages = [{}];
  user: string;
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.chatService.username === undefined) {
      this.router.navigate(['login']);
    }
    this.room = this.route.snapshot.params['id'];
    this.user = this.chatService.username;
    this.chatService.sendMessage(this.room, "Hi, I'm new!").subscribe(value => {
        this.messages = value;
     });

    this.chatService.privateMessage(this.user, "This is where your private messages will appear!").subscribe(value => {
      const x = { ogUser: value.ogUser, receiver: value.user, msg: value.msg };
      this.privateMessages.push(value);
    });

    const userInfo = {user: this.kickedUser, room: this.room};
    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      if (succeeded === this.user) {
        setTimeout(() => {
          this.router.navigate(['/rooms']);
        },
        2000);
      }
    });

    this.chatService.ban().subscribe(banned => {
      if (banned === this.user) {
        setTimeout(() => {
            this.router.navigate(['/rooms']);
          },
          2000);
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
    this.chatService.privateMessage(this.privateForm, this.chatForm).subscribe(value => {
    });
  }

   onDisconnect() {
    this.chatService.disconnect().subscribe(success => {
      this.router.navigate(['/login']);
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
