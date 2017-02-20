import { Component, OnInit } from '@angular/core';
import { ChatService} from '../chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: string[];
  roomName: string;
  users: string[];
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    if (this.chatService.username === undefined) {
      this.router.navigate(['login']);
    }
    this.chatService.getRoomList().subscribe(list => {
      this.rooms = list;
    });
    this.chatService.getUsers().subscribe(list => {
      this.users = list;
    });
  }

   onDisconnect() {
    this.chatService.disconnect().subscribe(success => {
      this.router.navigate(['/login']);
    });
  }
  onJoinRoom(room) {

    this.chatService.joinRoom(room).subscribe(success => {
      if (success === true) {
        this.router.navigate(['rooms', room]);
      }
    });
  }

}
