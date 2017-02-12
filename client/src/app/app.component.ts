import { Component } from '@angular/core';
import { ChatService} from './chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private chatService: ChatService, private router: Router) { }

   onDisconnect() {
    this.chatService.disconnect().subscribe(success => {
      this.router.navigate(['/login']);
    });
  }
}

