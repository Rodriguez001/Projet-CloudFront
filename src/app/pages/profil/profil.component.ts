import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersI } from 'src/app/shared/models/users-i';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  profil!: UsersI;
  constructor(public auth: AuthService, public users: UsersService) {
    console.log(this.auth.profil)
  
  }


}
