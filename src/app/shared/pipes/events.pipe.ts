import { Pipe, PipeTransform } from '@angular/core';
import { EvenementI } from '../models/evenement-i';

@Pipe({
  name: 'events',
})
export class EventsPipe implements PipeTransform {
  transform(listeEvents: Array<EvenementI>, filtre: string): Array<EvenementI> {
    console.log("Pipe", listeEvents, "filtre", filtre);
    return listeEvents.filter(
      (event) => (event.titre.toLowerCase().indexOf(filtre) > -1) || (event.horaires.debut.toLowerCase().indexOf(filtre) > -1)
      || (event.horaires.fin.toLowerCase().indexOf(filtre) > -1) || (event.places.toString().toLowerCase().indexOf(filtre) > -1)
    );
  }
}
