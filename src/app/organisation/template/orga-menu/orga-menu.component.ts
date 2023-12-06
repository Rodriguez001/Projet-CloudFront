import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItem } from "primeng/api"; 

@Component({
  selector: 'app-orga-menu',
  templateUrl: './orga-menu.component.html',
  styleUrls: ['./orga-menu.component.css']
})
export class OrgaMenuComponent {
  items: MenuItem[] = [];  

  constructor(public auth: AuthService, private router: Router){}

  ngOnInit() { 
    this.items = [ 
        { 
            label: "Administration", 
            icon: "pi pi-fw pi-users",
            routerLink: '/admin', 
            items: [ 
                { 
                    label: "Modification de roles", 
                    icon: "pi pi-fw pi-user-plus",
                    routerLink: '/admin',
                }, 
                { 
                    label: "les utilisateurs", 
                    icon: "pi pi-fw pi-users",
                    routerLink: '/admin',
                } 
            ] 
        }, 
        { 
            label: "Organisation", 
            items: [ 
                { 
                    label: "Accueil", 
                    icon: "pi pi-home",
                    routerLink: '/organisation'
                }, 
                { 
                    label: "Ajouter des évenements", 
                    icon: "pi pi-fw pi-download",
                    routerLink: '/organisation/events'
                },
                { 
                  label: "Voir des stocks", 
                  icon: "pi pi-fw pi-download",
                  routerLink: '/organisation/stocks'
              }  
            ] 
        } 
    ]; 
} 

}
