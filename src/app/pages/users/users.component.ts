import { Component, ViewChild } from '@angular/core';
import { UsersI } from 'src/app/shared/models/users-i';
import { UsersService } from 'src/app/shared/services/users.service';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild('dt') dt: Table | undefined; 
  //liste temporaire des utilisateurs
  listeUsers: Array<UsersI> = [];
    firstIndex: number = 0; 
    rows: number = 3; 
  constructor(private users: UsersService) {
    this.listeUsers = this.users.getlistUsers();
    this.listeUsers.forEach((u) =>
      console.log('user : ' + u.nom + ' - ' + u.prenom)
    );
  }

  reset() { 
    //Set first index to 0 
    this.firstIndex = 0; 
} 

previous() { 
    // Set first index of page to firstIndex - rows 
    if ((this.firstIndex - this.rows) < 0) return; 
    this.firstIndex = this.firstIndex - this.rows; 
} 

next() { 
    // Set first index of page to firstIndex + rows 
    if ((this.firstIndex + this.rows) > 
        this.listeUsers.length) return; 
    this.firstIndex = this.firstIndex + this.rows; 
} 

isFirst(): boolean { 
    return this.listeUsers ?  
        this.firstIndex === 0 : true; 
} 

isLast(): boolean { 
    return this.listeUsers ? 
        (this.firstIndex + this.rows) > 
        this.listeUsers.length : true; 
} 

applyFilterGlobal($event: any, stringVal: any) {
  this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}
}
