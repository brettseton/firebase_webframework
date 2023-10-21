import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import {
  DocumentReference,
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  DocumentData,
  collectionData,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  firestore: Firestore = inject(Firestore);
  auth: any = inject(Auth);
  //storage: Storage = inject(Storage);
  router: Router = inject(Router);
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

  // Observable user
  user$ = user(this.auth);

  // Adds a text or image message to Cloud Firestore.
  addMessage = async(textMessage: string | null, imageUrl: string | null): Promise<void | DocumentReference<DocumentData>> => {
    let data: any;
    try {
      this.user$.subscribe(async (user) => 
      { 
        if(textMessage && textMessage.length > 0) {
          data =  await addDoc(collection(this.firestore, 'messages'), {
            name: user?.displayName,
            text: textMessage,
            profilePicUrl: user?.photoURL,
            timestamp: serverTimestamp(),
            uid: user?.uid
          })}
          else if (imageUrl && imageUrl.length > 0) {
            data =  await addDoc(collection(this.firestore, 'messages'), {
              name: user?.displayName,
              imageUrl: imageUrl,
              profilePicUrl: user?.photoURL,
              timestamp: serverTimestamp(),
              uid: user?.uid
            });
          }
          return data;
        }
      );
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
      return;
    }
  }

  // Saves a new message to Cloud Firestore.
  saveTextMessage = async (messageText: string) => {
    return await this.addMessage(messageText, null);
  };

  // Loads chat messages history and listens for upcoming ones.
  loadMessages = () => {
    console.log("Loading Messages");

    this.user$.subscribe(async (user) => { console.log("user: ", user);});
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(this.firestore, 'messages'), orderBy('timestamp', 'desc'), limit(12));
    console.log("Generated Query: {0}", recentMessagesQuery);
    // Start listening to the query.
    const data = collectionData(recentMessagesQuery).forEach((item) => {console.log("Message: {0}", item);});
    console.log("Data: {0}", data);



    return collectionData(recentMessagesQuery);
  }

  // Saves a new message containing an image in Firebase.
  // This first saves the image in Firebase storage.
  saveImageMessage = async (file: any) => {};

  async updateData(path: string, data: any) {}

  async deleteData(path: string) {}

  getDocData(path: string) {}

  getCollectionData(path: string) {}

  async uploadToStorage(
    path: string,
    input: HTMLInputElement,
    contentType: any
  ) {
    return null;
  }
  // Requests permissions to show notifications.
  requestNotificationsPermissions = async () => {};

  saveMessagingDeviceToken = async () => {};
}
