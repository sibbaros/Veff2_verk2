import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {


  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) { }
  // rooms : string[]
  messages: [{}];
  users: string[];
  chatForm: string;
  privateForm: string;
  room: string;
  user: string;
  privateMessage = false;
  kicked: boolean;

  ngOnInit() {
    this.room = this.route.snapshot.params['id'];
    this.kicked = false;
    this.chatService.sendMessage(this.room, "Hi, I'm new!").subscribe(value => {
        this.messages = value;
     });
    this.chatService.getUsers().subscribe(list => {
      this.users = list;
      console.log("fer hingad inn!");
      console.log(this.users);
     // this.users.push(this.user);
    });
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
    const userInfo = {user: this.user, room: this.room};
    
    this.chatService.kickUserOut(userInfo).subscribe(succeeded => {
      console.log('kick user success!');
       this.kicked = true;
    });
    this.chatService.sendMessage(this.room, this.user +" has been kicked out of the room").subscribe(value => {
        this.messages = value;
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
