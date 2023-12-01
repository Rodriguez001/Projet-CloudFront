import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './template/footer/footer.component';
import { MenuComponent } from './template/menu/menu.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UsersComponent } from './pages/users/users.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LegalsComponent } from './pages/legals/legals.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErreurComponent } from './pages/erreur/erreur.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EventsPipe } from './shared/pipes/events.pipe';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { TokenInterceptor } from './shared/securite/token.interceptor';
import { Auth401Interceptor } from './shared/securite/auth401.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    AccueilComponent,
    ProfilComponent,
    UsersComponent,
    EvenementsComponent,
    InscriptionComponent,
    ConnexionComponent,
    LegalsComponent,
    ContactComponent,
    ErreurComponent,
    EventsPipe,
    EvenementComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, provideFirebaseApp(() => initializeApp({"projectId":"angular-app-81946","appId":"1:404115279632:web:ac1fa58948a023be739f95","storageBucket":"angular-app-81946.appspot.com","apiKey":"AIzaSyCVXlHkEifSq3T5iEfzxnNWJxm2uaevsTU","authDomain":"angular-app-81946.firebaseapp.com","messagingSenderId":"404115279632"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: Auth401Interceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
