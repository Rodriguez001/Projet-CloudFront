import { Injectable } from '@angular/core';
import { EvenementI } from '../models/evenement-i';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EvenementsService {
  [x: string]: any;
  listeEvents: Array<EvenementI> = [];
  //
  exampleObservables: Observable<Array<EvenementI>> = new Observable();
  listeEvenements$: BehaviorSubject<Array<EvenementI>> = new BehaviorSubject(
    [] as Array<EvenementI>
  );

  constructor(
    private http: HttpClient,
    private store: Firestore,
    private auth: AuthService,
    private route: Router
  ) {
    this.getlisteEvents();
    this.saveEvents();
  }

  getlisteEvents() {
    this.http.get<Array<EvenementI>>('assets/data/evenements.json').subscribe({
      next: (ev) => {
        console.log('Données reçues du JSON', ev);
        this.listeEvents = ev;
        this.listeEvenements$.next(ev);
      },
      error: (er) => console.log(er),
      complete: () => console.log('les évenements ont été chargés'),
    });

    const monDoc = collection(this.store, 'events');
    getDocs(monDoc)
      .then((liste) => {
        liste.forEach((u) => {
          this.listeEvents.push(u.data() as EvenementI);
        });
      })
      .catch((er) => console.log(er));
  }

  saveEvents() {
    console.log("debut du chargement 1")
    if(this.listeEvents){
      console.log("debut du chargement 2 : ", this.listeEvents );
      const monDoc = collection(this.store, 'events');
      this.listeEvenements$.forEach((ev) => {
        console.log("each saved event here : ", ev)
        addDoc(monDoc, ev)
          .then((e) => {
            console.log(" un evenement enregistré : ",e);
          })
          .catch((er) => console.log(er));
      });
    }
    
  }

  setlisteEvents(ev: Array<EvenementI>) {
    this.listeEvents = ev;
  }
  /** Recuperer un evenement de la liste */
  getEvenement(id: number): Observable<EvenementI> {
    return this.listeEvenements$.pipe(
      map((data) => {
        return data.filter((d) => d.date == id)[0];
      })
    );
  }
}
