import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UsersI } from '../models/users-i';
import { getAuth, updateProfile } from 'firebase/auth';
import { Router } from '@angular/router';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { Observable } from 'rxjs/internal/Observable';
import { FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private image: File | undefined;
  private autho = getAuth();
  public user = this.autho.currentUser;
  private liste_users: Array<UsersI> = [];
  selected: any;
  public lienUrl: string | undefined;
  constructor(
    private store: Firestore,
    private auth: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  creerProfil(profil: UsersI) {
    const monDoc = collection(this.store, 'users');
    addDoc(monDoc, profil)
      .then((p) => {
        console.log(p);
      })
      .catch((er) => console.log(er));
  }

  /** Permet de creer un objet ou de le mettre à jour à partir de son identifiant */
  gererDoc() {
    console.log('avatar file : ' + this.image?.name);
    if (this.image) {
      this.saveImage();
      this.auth.profil.uid = this.auth.user!.uid;
      console.log(
        'photo : ',
        this.auth.profil.avatar,
        'profil infos: ',
        this.auth.profil,
        'uid user : ',
        this.auth.user.uid
      );
    }

    const monDoc = doc(this.store, 'users', this.auth.user!.uid);
    setDoc(monDoc, this.auth.profil, { merge: true })
      .then((p) => {
        if (!this.auth.isloggedIn) {
          this.auth.isloggedIn = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Connexion reussie',
          });
          this.route.navigateByUrl('/connexion');
        } else {
          this.auth.isloggedIn = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Identifiants incorrects',
          });
          this.route.navigateByUrl('/');
        }

        console.log(p);
      })
      .catch((er) => console.log(er));

    // /users/uvGOBO0tzUQEBfI9YysCRyas2Vk2/statut/admin // La façon d'accéder à des données de firebase
  }

  supprimerProfil() {
    console.log("uid  to delete : " + this.auth.profil.uid!);    
    const monDoc = doc(this.store, 'users', this.auth.profil.uid!);
    deleteDoc(monDoc)
      .then((p) => console.log(p))
      .catch((er) => console.log(er));

    this.auth.delete();
    this.auth.logout();
  }

  getUser(uid: string) {
    const monDoc = doc(this.store, 'users', uid);
    getDoc(monDoc)
      .then((user) => console.log(user.id + ' => ' + user.data()))
      .catch((er) => console.log(er));
  }

  getlistUsers(): Array<UsersI> {
    this.liste_users = [];
    const monDoc = collection(this.store, 'users');
    getDocs(monDoc)
      .then((liste) => {
        liste.forEach((u) => {
          this.liste_users.push(u.data() as UsersI);
        });
      })
      .catch((er) => console.log(er));
    return this.liste_users;
  }

  loadImage(event: FileUploadEvent) {
    console.log('Loading event selection...:', event);
    this.image = event.files[0] as File;

    console.log('Load Image : ', this.image!);
    //this.imageUpload(this.image!.item(0) as File)
  }

  saveImage() {
    const img = this.image! as File;
    this.imageUpload(img!);
  }

  imageUpload(file: File) {
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/*',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.auth.profil.avatar = downloadURL;
          this.lienUrl = downloadURL as string;
          console.log('File available at', this.auth.profil.avatar);
        });
      }
    );
  }
}
