import { Component, OnInit } from '@angular/core';
import { ChatService} from '../chat.service';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
<<<<<<< HEAD

  constructor(private chatService: ChatService, /*private router: Router*/) { }
=======
  constructor(private chatService: ChatService) { }
>>>>>>> fdcd5bed41312216df19d4bae6ee75211abb45e3

  rooms: string[];
 // roomObjects: [{}]; 
  room: {
    id: number,
    name: string
  };
 

  ngOnInit() {
    this.chatService.getRoomList().subscribe(list => {
      this.rooms = list;
     // this.rooms.push(this.room.name);
    })
  }
  onJoinRoom(room){
    this.room.id = room.id;
    this.room.name = room.name;
    this.chatService.joinRoom(this.room).subscribe(success => {
      console.log("joining success!");
    }


    )

  }
  onAddRoom(){
     console.log("addroom called in component");

     this.chatService.joinRoom(this.room.name).subscribe(list => {
       //this.chatService.getRoomList();
      // this.chatService.getRoomList().subscribe(list => {

          this.rooms.push(this.room.name);
          //list.push(this.newRoom);
       })
    // });
  }
  /*
  onJoinRoom(){
    this.chatService.joinRoom(this.roomID, ).subscribe();  
  }*/

  onRoomNavigate(){
      // this.router.navigate(["/rooms"]);

  }

}
