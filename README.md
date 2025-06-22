# Sahan Global Health File Access

This is a React app integrated with Firebase Authentication and Storage.

## Setup Instructions

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Email/Password Authentication in the Authentication tab.
3. Enable Firebase Storage in the Storage tab.
4. Copy your Firebase config from Project Settings > SDK setup.
5. Replace the placeholder config in `src/firebaseConfig.js` with your actual config.
6. Install dependencies:
   ```
   npm install react-router-dom firebase qrcode.react
   ```
7. Run the app:
   ```
   npm start
   ```

## Features

- User registration and login using Firebase Authentication.
- Upload health files (PDF, JPG, PNG) to Firebase Storage.
- View uploaded files in Dashboard.
- Generate shareable links and QR codes for uploaded files.

---

Developed as per user's request.