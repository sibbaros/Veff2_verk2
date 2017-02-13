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
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(list => {
      this.rooms = list;
      // this.rooms.push("hi");
    });
  }
  onJoinRoom(room) {

    this.chatService.joinRoom(room).subscribe(success => {
      console.log('joining success!');
      if (success === true){
        this.router.navigate(['rooms', room]);
      }
    });
  }

}
