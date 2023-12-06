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
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
} from '@angular/fire/auth';
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
    avatar: '',
    lastlogin: 0,
    uid: '',
  };
  isloggedIn: boolean = false;
  isAdmin: boolean = false;
  user!: User;

  items = [
    { label: 'Accueil', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Evénements', icon: 'pi pi-info', routerLink: '/evenements' },
    { label: 'Mon profil', icon: 'pi pi-info', routerLink: '/profil' },
    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: '/utilisateurs' },
    {
      label: "S'inscrire",
      icon: 'pi pi-info',
      routerLink: '/inscription',
      visible: true,
    },
    {
      label: 'Se connecter',
      icon: 'pi pi-sign-in',
      routerLink: '/connexion',
      command: () => {
        console.log('visible : ' + this.isloggedIn);
      },
      visible: true,
    },
    {
      label: 'Se deconnecter',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
      visible: false,
    },
  ];

  // Integration de l'authentification de firebase
  private fire = inject(Auth);

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Firestore
  ) {}

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
        if (p.statut == 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
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
        const monDoc = doc(this.store, 'users', infos.user.uid);
        getDoc(monDoc)
          .then((doc) => {
            console.log('User connecté...', doc.data());
            this.profil = doc.data() as UsersI;
          })
          .catch((err) => {});

        this.profil.uid = infos.user.uid!;
        //this.profil.token = infos.user;
        this.isloggedIn = true;
        this.isAdmin = true;
        this.toggleLink();
        this.router.navigateByUrl('/');
        
        console.log(this.user);
      })
      .catch((er) => {
        console.log(er);
        this.isloggedIn = false;
        this.isAdmin = false;
      });
  }

  register() {
    createUserWithEmailAndPassword(
      this.fire,
      this.profil.email,
      this.profil.mdp
    )
      .then((result) => {
        this.user = result.user;
        this.isloggedIn = true;
        //this.router.navigateByUrl('/connexion');
        console.log('Registration successful:', result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration failed:', errorMessage);
        this.isloggedIn = false;
      });
  }

  delete() {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user!)
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
        this.isloggedIn = false;
        this.profil = {
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
          avatar: '',
          lastlogin: 0,
          uid: '',
        };
        this.toggleLink();
        this.router.navigateByUrl('/connexion');
        console.log('Logout successful');
      })
      .catch((error) => console.error('Logout failed:', error));
  }

  toggleLink() {
    // Inverse la visibilité du lien
    this.items[4].visible = !this.items[4].visible;
    this.items[5].visible = !this.items[5].visible;
    this.items[6].visible = !this.items[6].visible;
  }
}
