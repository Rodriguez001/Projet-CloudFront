import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UsersComponent } from './pages/users/users.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LegalsComponent } from './pages/legals/legals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { OrganisationModule } from './organisation/organisation.module';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { authGuard } from './shared/securite/auth.guard';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: 'utilisateurs', component: UsersComponent, canActivate: [authGuard]  },
  { path: 'evenements', component: EvenementsComponent },
  { path: 'evenement/:barbapapa', component: EvenementComponent},
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connextion', component: ConnexionComponent },
  { path: 'rgpd', component: LegalsComponent },
  { path: 'mentions', component: LegalsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'connexion', component: ConnexionComponent },
  {
    path: 'organisation',
    loadChildren: () =>
      import('./organisation/organisation.module').then(
        (m) => m.OrganisationModule,             
      ),
      canActivate: [authGuard]
  },
  { path: '**', component: ErreurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
