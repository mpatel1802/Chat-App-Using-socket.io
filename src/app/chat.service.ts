import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket | undefined; // The client instance of socket.io
  public getMessages: Subject<string> = new Subject();

  constructor() {

    this.socket = io('https://chat-app-37871.herokuapp.com/');

    this.socket?.on('chat message', (msg: string) => {
      this.getMessages.next(msg); // send the new message
    });

  }

  sendMessage(msg: string) {
    this.socket?.emit('chat message', msg);
  }

}
