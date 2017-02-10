import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ChatService} from '../chat.service';
>>>>>>> b2e1c32a4fd071e4673d9c848637e7187b4087b5

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
=======
  constructor(private chatService: ChatService) { }

  rooms: string[];

  ngOnInit() {
    this.chatService.getRoomList().subscribe(list => {
      this.rooms = list;
    })
>>>>>>> b2e1c32a4fd071e4673d9c848637e7187b4087b5
  }

}
