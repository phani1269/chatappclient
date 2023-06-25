import { Component } from '@angular/core';
import { UsersService } from 'src/app/_services/user/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private usersService: UsersService) { 
    this.usersService.currentUserProfile$
  }
}
