import { Component, OnInit } from '@angular/core';  
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-racine',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CY2023-feast';
  soustitre:string = "L'application de gestion de vos soirées";
  moustache:string = 'Affiche moi des moustache steuplé {{ !';
  listeMoustaches:Array<string> = ['Moustache', 'Favoris'];
  autreListeMoustaches:string[] = [];

  constructor(private primengConfig: PrimeNGConfig){};

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    
  }

  peupleMoustaches(){
    console.log('Peuple moustache appelé');
  }
}
