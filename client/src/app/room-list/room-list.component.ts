import { Component, OnInit } from '@angular/core';
import { ChatService} from '../chat.service';
import { Router } from '@angular/router';

function Room(id, name){
  this.id = id;
  this.name = name;
}
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {


  constructor(private chatService: ChatService, private router: Router) { }


  rooms: string[];
 // roomObjects: [{}]; 
 /* id: number;
  name: string;
  room: {
    id : string,
    name: string;
  };*/
 


  ngOnInit() {
    this.chatService.getRoomList().subscribe(list => {
      this.rooms = list;
     // this.rooms.push(this.room.name);
    })
  }
  onJoinRoom(room){
    var r = new Room(1, room);
   // this.room.id = 1; //room.id;
   // this.room.name = room;
    console.log(r.name);
    this.chatService.joinRoom(r).subscribe(success => {
      console.log("joining success!");
   //   this.router.navigate(["/" + r.id.toString()]);

    }


   )

  }
  onAddRoom(){
     console.log("addroom called in component");

    // this.chatService.joinRoom(this.room.name).subscribe(list => {
       //this.chatService.getRoomList();
      // this.chatService.getRoomList().subscribe(list => {

       //   this.rooms.push(this.room.name);
          //list.push(this.newRoom);
      // })
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
