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
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }
  onLogin() {
      console.log('login called in component');

      this.chatService.login(this.username).subscribe(succeeded => {
      this.loginFailed = !succeeded;
      if (succeeded === true) {
        this.router.navigate(['/rooms']);
        console.log('hi');
      }
      if (succeeded === false) {
        console.log('failure');
      }
    });
  }
}
