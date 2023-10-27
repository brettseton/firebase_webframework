import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})

export class BodyComponent {
  chatService = inject(ChatService);
  messages$ = this.chatService.loadMessages() as Observable<DocumentData[]>;
  messagesReversed = this.messages$.pipe(
    map((messages) => messages.reverse())
  );
  user$ = this.chatService.user$;
  text = '';

  themeList = ['serika', 'serika_dark', 'fledgling', 'sonokai'];

  changeTheme(): void {
    const themeElement = document.getElementById('myTheme');
    if (themeElement) {
      const nextTheme = this.themeList.at(this.themeList.indexOf(themeElement.classList.value) +1) ?? this.themeList[0];
      themeElement.classList.value = nextTheme;
    }
  }

  sendTextMessage() {
    // Don't send just white space
    if(this.text.trim().length == 0 ) {
      console.debug("Not sending Message: " + this.text);
      return;
    }
    console.debug("Sending Message: " + this.text)
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
