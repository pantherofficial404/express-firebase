const firebase = require("firebase/app");
require("firebase/storage");
require("firebase/database");
require('firebase/auth');

class firebaseServices {

  isInitialized() {
    return !firebase.app.length;
  }

  async isConnected() {
    const dbRef = this.firestore.ref('.info/connected');
    const response = await dbRef.once('value', (snapshot) => { return snapshot.val() });
    return response.val();
  }

  async connect(firebaseConfig) {
    if (this.isInitialized()) {
      await firebase.app().delete();
    }
    firebase.initializeApp(firebaseConfig);
    this.firestore = firebase.database();
    this.firebaseStorage = firebase.storage();
    this.firebaseAuth = firebase.auth();
  }

  async post(path, data) {
    await this.firestore.ref(path).push(data);
  }

  async get(path) {
    const dbRef = await this.firestore.ref(path)
    const response = await dbRef.once('value', (snapshot) => { return snapshot.val() });
    return response.val();
  }

  async put(path, data) {
    await this.firestore.ref(path).set(data);
  }

  async delete(path, id) {
    let apiPath = path;
    if (id) {
      apiPath += `/${id}`;
    }
    const dbRef = await this.firestore.ref(apiPath);
    await dbRef.remove();
  }
  async uploadFile(fileName, file) {
    const fileRef = await this.firebaseStorage.ref().child(fileName).put(file)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        return downloadURL;
      });
    return fileRef;
  }

  async signup(email, password) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        return {
          code: 200,
          data: {
            email: email,
            id: data.user.uid,
            refreshToken: data.user.refreshToken,
            isVerified: data.user.emailVerified,
          },
          success: true,
        }
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          return {
            code: 400,
            data: {
              message: 'User is already exists',
            },
            success: false,
          }
        }
        if (err.code === 'auth/weak-password') {
          return {
            code: 400,
            data: {
              message: 'Password is too weak',
            },
            success: false,
          }
        }
        return {
          code: 400,
          data: {
            message: 'Something went wrong.'
          },
          success: false,
        }
      });
  };

  async login(email, password) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        return {
          code: 200,
          data: {
            email: email,
            id: data.user.uid,
            isVerified: data.user.emailVerified,
            refreshToken: data.user.refreshToken,
          },
          success: true,
        }
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          return {
            code: 400,
            data: {
              message: 'User not found',
            },
            success: false,
          }
        }
        if (err.code === 'auth/wrong-password') {
          return {
            code: 400,
            data: {
              message: 'Incorrect password',
            },
            success: false,
          }
        }
        return {
          code: 400,
          data: {
            message: 'Something went wrong',
          },
          success: false,
        }
      });
  }


  async logout() {
    return this.firebaseAuth.signOut()
      .then((data) => {
        return {
          code: 200,
          data: {
            message: 'Logout successfull',
          },
          success: true,
        }
      })
      .catch((err) => {
        return {
          code: 400,
          data: {
            message: 'Something went wrong',
          },
          success: false,
        }
      });
  }

  async getCurrentUser() {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      return {
        code: 200,
        data: {
          email: user.email,
          id: user.uid,
          refreshToken: user.refreshToken,
          isVerified: data.user.emailVerified,
        },
        success: true,
      }
    }
    return {
      code: 404,
      data: {
        message: 'User is not logged in',
      },
      success: false,
    }
  }

  async isLoggedIn() {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      return {
        code: 200,
        data: {
          message: true,
        },
        success: true,
      }
    }
    return {
      code: 404,
      data: {
        message: false,
      },
      success: false,
    }
  }

  async sendEmailVerification() {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      user.sendEmailVerification();
    } else {
      return {
        code: 404,
        data: {
          message: 'User is not logged in',
        },
        success: false,
      }
    }
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider)
      .then((data) => {
        return {
          code: 200,
          data: {
            email: data.user.email,
            id: data.user.uid,
            refreshToken: data.user.refreshToken,
            isVerified: data.user.emailVerified,
          },
          success: true,
        }
      })
      .catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          return {
            code: 400,
            data: {
              message: 'Account is already exists with this email',
            },
            success: false,
          }
        }
        return {
          code: 400,
          data: {
            message: 'Unable to login',
          },
          success: false,
        }
      });
  }

  async loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider)
      .then((data) => {
        return {
          code: 200,
          data: {
            email: data.user.email,
            id: data.user.uid,
            refreshToken: data.user.refreshToken,
            isVerified: data.user.emailVerified,
          },
          success: true,
        }
      })
      .catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          return {
            code: 400,
            data: {
              message: 'Account is already exists with this email',
            },
            success: false,
          }
        }
        return {
          code: 400,
          data: {
            message: 'Unable to login',
          },
          success: false,
        }
      });
  }
}
export default new firebaseServices();