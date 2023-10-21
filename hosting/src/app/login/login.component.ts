import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

@Injectable({
  providedIn: 'root',
})
export class LoginComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  auth: any = inject(Auth);
  private provider = new GoogleAuthProvider();
  router: Router = inject(Router);
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

  // Observable user
  user$ = user(this.auth);
  ngOnInit(): void {}

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //this.router.navigate(['/', 'chat']);
        return credential;
    })
  }

  logout() {
      signOut(this.auth).then(() => {
          this.router.navigate(['/', 'login'])
          console.log('signed out');
      }).catch((error) => {
          console.log('sign out error: ' + error);
      })
  }
}
