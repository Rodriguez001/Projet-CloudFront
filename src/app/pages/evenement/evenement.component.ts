import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EvenementI } from 'src/app/shared/models/evenement-i';
import { EvenementsService } from 'src/app/shared/services/evenements.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css'],
})
export class EvenementComponent {
  eventId: any = '';
  evenement: EvenementI = {titre: '', date:0, infos:'', places:0, horaires:{debut:'', fin:''}, media: {alt:'', src:''}};
  @Input('selectedE') selectedEvent!: EvenementI;
  @Output() closeEvent = new EventEmitter<null>();
  constructor(
    private route: ActivatedRoute,
    public events: EvenementsService
  ) {}

  ngOnInit(): void {
    
    this.eventId = this.route.snapshot.paramMap.get('barbapapa') || -1;

      console.log('Evenement:', this.events.getEvenement(this.eventId));
     this.events.getEvenement(this.eventId).subscribe(ev => {
        this.evenement = ev;
     });
    
  }
  fermer(){
    this.closeEvent.emit(null);
  }
  
}
