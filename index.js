import * as firebase from 'firebase';

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
    console.log('Connected To Firebase');
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
}
export default new firebaseServices();