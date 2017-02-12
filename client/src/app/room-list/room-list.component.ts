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
      //this.rooms.push("hi");
    });
  }
  onJoinRoom(room) {

    this.chatService.joinRoom(room).subscribe(success => {
      console.log('joining success!');
      this.router.navigate(['/' + room]);

    });
  }

  onAddRoom(roomName){
    // muna ad gefa theim sem gerir herbergid creator status
    this.chatService.getRoomList().subscribe(list => {
      console.log('addroom called in component');
      console.log(this.roomName);
      list.push(roomName);

    });
      

      
      
    // var r = new Room(this.rooms.length, roomName);
     // this.chatService.joinRoom(roomName).subscribe(success => {
      // console.log('joining success!');
     //this.rooms.push(roomName);
     // this.rooms.push(roomName);
     // this.chatService.getRoomList().subscribe(list => {
      // this.rooms = list;
      // this.rooms.push(roomName);
    //  this.roomObjects.push(r);

     // this.rooms.push(this.room.name);
  //  });
   //   this.router.navigate(["/" + r.id.toString()]);

   // });
    // this.chatService.joinRoom(this.room.name).subscribe(list => {
       // this.chatService.getRoomList();
      // this.chatService.getRoomList().subscribe(list => {

       //   this.rooms.push(this.room.name);
          // list.push(this.newRoom);
      // })
    // });
  }

  onRoomNavigate() {
      // this.router.navigate(["/rooms"]);
  }

  onDisconnect(){
    this.chatService.disconnect().subscribe(success => {
      this.router.navigate(['/login']);
    })
  }

}
