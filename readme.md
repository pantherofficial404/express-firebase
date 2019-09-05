# Express Firebase

A very good helper library for connecting react js applications to firebase. It is basically wrapper of all firebase functions

## Installation

  ```bash
  yarn add express-firebase
  ```
  or
  ```bash
  npm install --save express-firebase
  ```
  
## Usage

```js
import expressFirebase from 'express-firebase';

const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxxxx',
};

expressFirebase.connect(firebaseConfig);
```

## Add Data

```js
await expressFirebase.post('/add',
{name:'I love express firebase',version:'1.0.0'});
```

## Get Data

```js
const response = await expressFirebase.get('/add');
```

## Update

```js
await expressFirebase.put('/add',
{name:'I Love Express Firebase Updated',version:'1.0.1'});
```

## Delete

```js
await expressFirebase.delete('/add','xxxxxxxxxxxxxxx');
```

## Upload Image

```js
const imageUrl = await expressFirebase.uploadFile('imageName','image data');
```

## Login

```js
const response = await expressFirebase.login('abc@gmail.com','password');
```

## Signup

```js
const signup = await expressFirebase.signup('abc@gmail.com','password');
```

## Logout

```js
const response = await expressFirebase.logout();
```

## Get Current User

```js
const response = await expressFirebase.getCurrentUser();
```

## isLoggedIn

```js 
const response = await expressFirebase.isLoggedIn();
```

## Email Verification

```js
const response = await expressFirebase.sendEmailVerification();
```

## OAuth - Google

```js
const response = await expressFirebase.loginWithGoogle();
```

## OAuth - Github

```js
const response = await expressFirebase.loginWithGithub();
```

