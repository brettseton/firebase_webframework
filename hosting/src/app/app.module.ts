import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { BodyComponent } from './body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BodyComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      //if (location.hostname === 'localhost') {
      //    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      //}
      return auth;
  }),
  provideFirestore(() => {
      const firestore = getFirestore();
      if (location.hostname === 'localhost') {
          connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return firestore;
  }),
  provideStorage(() => {
      const storage = getStorage();
      if (location.hostname === 'localhost') {
          connectStorageEmulator(storage, '127.0.0.1', 5001);
      }
      return storage;
  }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
