import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { UsersService } from 'src/app/_services/user/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$ = this.usersService.currentUserProfile$;

  constructor(private usersService: UsersService, private authService: AuthenticationService) {
  }
}
