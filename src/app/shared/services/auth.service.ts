import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersI } from '../models/users-i';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  deleteUser
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authID: { id: string; mdp: string } = { id: '', mdp: '' };
  profil: UsersI = {
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    statut: '',
    emailverified: true,
    token: '',
    tel: '',
    mobile: '',
    dateCreation: 0,
    infos: '',
    //avatar: 'null',
    lastlogin: 0,
    uid: ''
   };
  isloggedIn: boolean = false;
  user!: User;

  // Integration de l'authentification de firebase
  private fire = inject(Auth);

  constructor(private http: HttpClient, private router: Router) {}

  authentification() {
    if (!this.profil.email || !this.profil.mdp) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const url = `assets/data/ids/${this.profil.email}@${this.profil.mdp}.json`;
    this.http.get<UsersI>(url).subscribe({
      next: (p) => {
        console.log('Données téléchargées du JSON', p);
        this.profil = p;
        this.isloggedIn = true;
        this.router.navigateByUrl('/');
      },
      error: (er) => console.log(er),
      complete: () => console.log('Connecté'),
    });
  }
  /**Methodes pourt s'authentifier en utilisant la methode de firebase */
  fireAuth() {
    signInWithEmailAndPassword(this.fire, this.profil.email, this.profil.mdp)
      .then((infos) => {
        this.user = infos.user;
        this.profil.tel = infos.user.phoneNumber!
        this.profil.nom = infos.user.displayName!
        //this.profil.mdp = infos.user.providerData.providerId!      
        this.profil.dateCreation = parseInt(infos.user.metadata.creationTime!);
        this.profil.lastlogin = parseInt(infos.user.metadata.lastSignInTime!);
        this.profil.email = infos.user.email!;
        this.profil.nom = infos.user.displayName!;
        this.profil.uid = infos.user.uid!;
        //this.profil.token = infos.user;
        this.isloggedIn = true;
        this.router.navigateByUrl('/');

        console.log(this.user);
      })
      .catch((er) => {
        console.log(er);
        this.isloggedIn = false;
      });
  }

  register() {
    createUserWithEmailAndPassword(this.fire, this.profil.email, this.profil.mdp)
      .then((result) => {
        this.user = result.user
        this.isloggedIn = true
        //this.router.navigateByUrl('/connexion');
        console.log('Registration successful:', result.user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration failed:', errorMessage);
        this.isloggedIn = false
      });
  }

  delete() {
    deleteUser(this.user)
      .then((p) => console.log('deleting user successful:', p))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Deletion failed:', errorMessage);
      });
  }

  logout() {
    signOut(this.fire)
      .then((result) => {
        this.isloggedIn = false
        this.router.navigateByUrl('/connexion');
        console.log('Logout successful')
      })
      .catch((error) => console.error('Logout failed:', error));
  }
}
