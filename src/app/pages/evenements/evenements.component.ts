import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { EvenementsService } from 'src/app/shared/services/evenements.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Table } from 'primeng/table'
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

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService,ConfirmationService]
})
export class EvenementsComponent implements OnInit{

  @ViewChild('dt') dt!: Table; 

  productDialog: boolean = false;
  submitted: boolean | undefined;
  evenement: EvenementI | undefined = {
      titre: "",
      date: 0,
      places: 0,
      horaires: {
        debut: "",
        fin: ""
      },
      media: {
        src: "assets/images/event.png",
        alt: "image inexistante"
      }
    };
  statuses: any[]|undefined;


  Delete: string | undefined;
  selectedEvents: any;


  filtre: string = '';
  listener: Subscription;
  selectedEvent!: EvenementI | null;
  choix: boolean = false;
  depart: number = 0;
  pas: number = 5;
  constructor(private store: Firestore, public events: EvenementsService, private messageService: MessageService, private confirmationService: ConfirmationService, public auth: AuthService) {
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

  ngOnInit() {
    this.listener = this.events.listeEvenements$.subscribe({
      next: (evs) => console.log('From Observable subscription'),
      error: (er) => console.log('Error: ' + er),
      complete: () => console.log('Data synchronezed:'),
    });

    this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
}

openNew() {
  this.evenement = {
    id: "",
    titre: "",
    date: 0,
    places: 0,
    horaires: {
      debut: "",
      fin: ""
    },
    media: {
      src: "assets/images/event.png",
      alt: "image inexistante"
    }
  };
  this.submitted = false;
  this.productDialog = true;
}

deleteSelectedEvents() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected events?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.events.listeEvents = this.events.listeEvents.filter((val: any) => !this.selectedEvents.includes(val));
          this.selectedEvents = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
      }
  });
}

editEvent(evenement: EvenementI) {
  this.evenement = {...evenement};
  this.productDialog = true;
}

deleteEvent(evenement: EvenementI) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + evenement.titre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

          this.events.listeEvents = this.events.listeEvents.filter(val => val.titre !== evenement.titre);
          
          if(this.evenement){
            const monDoc = doc(this.store, 'events', this.evenement.id!);            
              deleteDoc(monDoc)
                .then((e) => {
                  console.log(" un evenement supprimé : ",e);
                })
                .catch((er) => console.log(er));
              }
              this.evenement = {
                id: "",
                titre: "",
                date: 0,
                places: 0,
                horaires: {
                  debut: "",
                  fin: ""
                },
                media: {
                  src: "assets/images/event.png",
                  alt: "image inexistante"
                }
              };
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
      }
  });
}
 
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
 
  saveEvent() {
    this.submitted = true;

    if (this.evenement!.titre.trim()) {
        if (this.evenement!.id) {
            this.evenement!.id = this.createId();
            this.events.listeEvents[this.findIndexById(this.evenement!.titre)] = this.evenement!;
            if(this.evenement){
              const monDoc = doc(this.store, 'events', this.evenement.id);            
                setDoc(monDoc, this.evenement, { merge: true })
                  .then((e) => {
                    console.log(" un evenement enregistré : ",e);
                  })
                  .catch((er) => console.log(er));
                }
            
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
        }
        else {
            this.evenement!.id = this.createId();
            this.evenement!.media.src = 'assets/images/event2.png';
            const monDoc = collection(this.store, 'events');            
              addDoc(monDoc, this.evenement!)
                .then((e) => {
                  console.log(" un evenement enregistré : ",e);
                })
                .catch((er) => console.log(er));
            this.events.listeEvents.push(this.evenement!);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Event Created', life: 3000});
        }

        this.events.listeEvents = [...this.events.listeEvents];
        this.productDialog = false;
        this.evenement = {
          id: "",
          titre: "",
          date: 0,
          places: 0,
          horaires: {
            debut: "",
            fin: ""
          },
          media: {
            src: "assets/images/event.png",
            alt: "image inexistante"
          }
        };
    }
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.events.listeEvents.length; i++) {
        if (this.events.listeEvents[i].titre === id) {
            index = i;
            break;
        }
    }

    return index;
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
 

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  participerSelectedEvents() {
    throw new Error('Method not implemented.');
    }
}
