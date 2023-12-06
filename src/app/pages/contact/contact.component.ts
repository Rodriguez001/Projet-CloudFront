import { Component } from '@angular/core';
import { ContactI } from 'src/app/shared/models/users-i';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    message: ''
  };

  constructor( private messageService: MessageService, private router: Router){

  }
  coucouToi() {
    console.log(this.contact);
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'message envoyé', life: 3000});
    //this.router.navigateByUrl('/');
  }
}
