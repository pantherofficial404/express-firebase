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
