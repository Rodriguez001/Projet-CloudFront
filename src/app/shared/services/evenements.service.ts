import { Injectable } from '@angular/core';
import { EvenementI } from '../models/evenement-i';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvenementsService {
  [x: string]: any;
  listeEvents: Array<EvenementI> = [];
  //
  exampleObservables: Observable<Array<EvenementI>> = new Observable();
  listeEvenements$:BehaviorSubject<Array<EvenementI>> = new BehaviorSubject([] as Array<EvenementI>);

  constructor(private http: HttpClient) {
    this.getlisteEvents();
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
  }

  setlisteEvents(ev: Array<EvenementI>) {
    this.listeEvents = ev;
  }
  /** Recuperer un evenement de la liste */
  getEvenement(id: number): Observable<EvenementI> {
     return this.listeEvenements$.pipe(map(data => {
      return data.filter(d => d.date == id)[0];
    }));
  }
}


