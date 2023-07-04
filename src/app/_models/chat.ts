import { ProfileUser } from "./user-profile";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: string;
    userIds: string[];
    users: ProfileUser[];
  
    // Not stored, only for display 
    chatPic?: string;
    chatName?: string;
  }