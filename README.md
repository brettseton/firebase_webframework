# Firebase Angular Webframework Sample Chat App

Currently hosted at https://webframework-d2629.web.app

Developed with firebase with the help of https://firebase.google.com/codelabs/firebase-web.

Code is based on code from https://github.com/firebase/codelab-friendlychat-web/tree/main/angularfire-start

### To Run

```shell
cd hosting 
npm install
cd ..
```

### For emulating locally

```shell
# Run from the home directory

# If you don't have firebase install with npm
npm -g install firebase-tools
firebase login

# Note that firebase emulation requires Java JDK to be installed
firebase emulators:start
```

You should now see the application running at http://localhost:5000

Authentication will NOT work if you use [http://127.0.0.1:5000](http://localhost:5000) (localhost is required)

### To deploy remotely
```
firebase deploy
```
