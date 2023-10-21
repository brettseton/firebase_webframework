import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent {
  chatService = inject(ChatService);
  messages$ = this.chatService.loadMessages() as Observable<DocumentData[]>;
  user$ = this.chatService.user$;
  text = '';

  sendTextMessage() {
    console.log("Sending Message: " + this.text)
    this.chatService.saveTextMessage(this.text);
    this.text = '';
  }

  uploadImage(event: any) {
    const imgFile: File = event.target.files[0];
    if (!imgFile) {
      return;
    }
    this.chatService.saveImageMessage(imgFile);
  }

}
