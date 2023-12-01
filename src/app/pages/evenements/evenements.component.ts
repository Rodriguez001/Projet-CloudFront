import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css'],
})
export class EvenementsComponent {
  filtre: string = '';
  listener: Subscription;
  selectedEvent!: EvenementI | null;
  choix: boolean = false;
  depart: number = 0;
  pas: number = 5;
  constructor(public events: EvenementsService) {
    //We subscribe to the BehaviorSubject from tje EvenementsService to get data when they come
    document.addEventListener('onload', () => {
      console.log('coucou; bonjour');
    });
    this.listener = this.events.listeEvenements$.subscribe({
      next: (evs) => console.log('From Observable subscription'),
      error: (er) => console.log('Error: ' + er),
      complete: () => console.log('Data synchronezed:'),
    });
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  initEvent() {
    this.selectedEvent = null;
  }

  avant() {
    if (this.depart + this.pas > this.events.listeEvents.length) {
      this.depart = this.depart + this.pas - this.events.listeEvents.length;
    } else {
      this.depart += 4;
    }
  }
  arriere() {
    if (this.depart - this.pas < 0){
      this.depart = this.events.listeEvents.length - (this.depart + this.pas)
    }
      this.depart -= 4;
  }
}
