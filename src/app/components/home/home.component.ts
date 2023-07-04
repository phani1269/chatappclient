import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Chat } from 'src/app/_models/chat';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { UsersService } from 'src/app/_services/user/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  user$ = this.usersService.currentUserProfile$;

  allusers$ = this.usersService.allUsers$;

  myChats$ : Observable<Chat[]>;

  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl('');

  otherUsers$ = combineLatest([this.usersService.allUsers$, this.user$]).pipe(
    map(([users, user]) => users.filter((u) => u.uid !== user?.uid))
  );

  users$ = combineLatest([
    this.otherUsers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, searchString]) => {
      return users.filter((u) =>
        u.displayName?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
  );

  constructor(public usersService: UsersService,private chatService:ChatService) {

    this.usersService.currentUserProfile$.subscribe((user)=>{
      this.myChats$ = this.chatService.myChats$(user.uid)
    })

  }

  createChat(user){
    console.log(user);
  }
}
