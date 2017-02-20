import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  loginFailed = false;
  empty = false;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }
  onLogin() {
      if (this.username === undefined) {
        this.empty = true;
      } else {
        this.chatService.login(this.username).subscribe(succeeded => {
          this.loginFailed = !succeeded;
          if (succeeded === true) {
            this.router.navigate(['/rooms']);
          }
        });
      }

  }
}
