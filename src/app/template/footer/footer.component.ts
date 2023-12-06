import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  items = [
    { label: 'Mentions légales', icon: 'pi pi-info', routerLink: '/mentions' },
    { label: 'Contact', icon: 'pi pi-enloppe', routerLink: '/contact' },
    { label: 'RGPD', icon: 'pi pi-info', routerLink: '/rgpd' },
    { label: 'Accès privé (organisation)', icon: 'pi pi-users', routerLink: '/organisation' },
    { label: 'Administration', icon: 'pi pi-user', routerLink: '/admin' }    
  ];

  constructor(public auth: AuthService, private router: Router){}

}
