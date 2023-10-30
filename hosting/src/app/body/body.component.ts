import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ChatService } from 'src/services/chat.service';
import DefaultConfig from '../../constants/default-config';

let config = {
  ...DefaultConfig
}

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

  /**
   *
   */
  constructor() {
    this.loadFromLocalStorage();
    
  }


  themeList = ['serika', 'serika_dark', 'fledgling', 'sonokai', 'ms_cupcakes'];

  changeTheme(): void {
    const themeElement = document.getElementById('myTheme');
    if (themeElement) {
      const nextTheme = this.themeList.at(this.themeList.indexOf(themeElement.classList.value) + 1) ?? this.themeList[0];
      this.setTheme(nextTheme);
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

  setTheme(name: string, nosave?: boolean): boolean {
    console.log("setting theme: ", name)
    const themeElement = document.getElementById('myTheme');
    if (themeElement) {
      const nextTheme = this.themeList.at(this.themeList.indexOf(name)) ?? this.themeList[0];
      themeElement.classList.value = nextTheme;
    }
    config.theme = name;
    this.saveToLocalStorage("theme", nosave);
    return true;
  }

  async saveToLocalStorage(
    key: keyof Config,
    nosave = false,
  ): Promise<void> {
    if (nosave) return;
  
    const localToSave = config;
  
    const localToSaveStringified = JSON.stringify(localToSave);
    window.localStorage.setItem("config", localToSaveStringified);
  }

  loadFromLocalStorage(): void {
    console.log("loading localStorage config");
    const newConfigString = window.localStorage.getItem("config");
    let newConfig: Config;
    if (
      newConfigString !== undefined &&
      newConfigString !== null &&
      newConfigString !== ""
    ) {
      try {
        newConfig = JSON.parse(newConfigString);
      } catch (e) {
        newConfig = {} as Config;
      }
      console.log(newConfig);
      this.apply(newConfig);
      config = newConfig;
      this.saveFullConfigToLocalStorage(true);
    } else {
      this.reset();
    }

  }

  reset(): void {
    this.apply(DefaultConfig);
    this.saveFullConfigToLocalStorage();
  }

  apply(
    configToApply: Config
  ): void {
    if (!configToApply) return;
  
    const configObj = configToApply as Config;
    (Object.keys(DefaultConfig) as (keyof Config)[]).forEach(
      (configKey) => {
        if (configObj[configKey] === undefined) {
          const newValue = DefaultConfig[configKey];
          (configObj[configKey] as typeof newValue) = newValue;
        }
      }
    );
    if (configObj !== undefined && configObj !== null) {
      this.setTheme(
        configObj.theme,
        true
      );
    }
  }

  saveFullConfigToLocalStorage(
    noDbCheck = false
  ): void {
    console.log("saving full config to localStorage");
    const save = config;
    const stringified = JSON.stringify(save);
    window.localStorage.setItem("config", stringified);
  }
}
