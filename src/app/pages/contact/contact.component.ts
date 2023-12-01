import { Component } from '@angular/core';
import { ContactI } from 'src/app/shared/models/users-i';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contact: ContactI = {
    nom: '',
    prenom: '',
    age: 0,
    adresse: { rue: '2 bv lucien fabre', codePostal: '64000', ville: 'Pau' },
    tel: '4787545',
    mobile: '4545454553',
    email: 'email@',
    infos: '',
  };

  coucouToi() {
    console.log(this.contact);
  }
}
