import { Component } from '@angular/core';
import { UsersI } from 'src/app/shared/models/users-i';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  //liste temporaire des utilisateurs
  listeUsers: Array<UsersI> = [
    {
      nom: 'kamgaing',
      prenom: 'rodrigue',
      email: 'kamgaingro@gmail.com',
      mdp: 'rodrigue',
      statut: 'admin',
      dateCreation: 124464867854,
      lastlogin: 123255488,
    },
    {
      nom: 'Lemogo',
      prenom: 'franck',
      email: 'lemogo@gmail.com',
      mdp: 'lemogo',
      statut: 'user',
      dateCreation: 124464867854,
      lastlogin: 123255488,
    },
  ];
  constructor(private users: UsersService) {
    this.listeUsers = this.users.getlistUsers();
    this.listeUsers.forEach((u) =>
      console.log('user : ' + u.nom + ' - ' + u.prenom)
    );
  }
}
