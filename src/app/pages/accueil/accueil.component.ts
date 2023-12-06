import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  title = 'CY2023-feast\n';
  soustitre: string = "L'application de gestion de vos soirées";
  moustache: string = 'Le Top de l\'entertainment, venez vous amusez !\n';
  listeMoustaches: Array<string> = ['Bonjour', 'tout le monde!'];
}
