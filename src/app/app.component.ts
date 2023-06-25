import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/auth/authentication.service';
import { UsersService } from './_services/user/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatappclient';

  user$ = this.usersService.currentUserProfile$;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService

  ) {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
