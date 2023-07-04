import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Chat } from 'src/app/_models/chat';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { constants } from '../constant';
import { UsersService } from '../user/users.service';
import { ProfileUser } from 'src/app/_models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  basePath: string;

  constructor(private apiService: BaseHttpService, private userService: UsersService) {
    this.basePath = environment.API_URL;
  }

  myChats$(currentUser:string): Observable<Chat[]> {
    const url = constants.apiendpoints.getAllChats;

    return this.apiService.getAll(`${this.basePath}/${url}`).pipe(map(
      (chats: any) => this.addChatNameAndPic(currentUser, chats)));

  }

  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach(chat => {
      var otherUser = chat.userIds.filter(userId => userId != currentUserId)[0];
      this.userService.getUserById(otherUser).subscribe((res) => {
        chat.chatName = res.displayName;
        chat.chatPic = res.photoURL;
      })
    });
    return chats;
  }
}
