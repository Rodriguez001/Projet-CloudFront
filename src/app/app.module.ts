import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag'; 
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';


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
  imports: [BrowserModule, BrowserAnimationsModule, MenubarModule, AvatarModule, AvatarGroupModule, InputNumberModule, ToolbarModule, ConfirmDialogModule, CalendarModule, DynamicDialogModule, DialogModule, ConfirmPopupModule, SplitterModule, TagModule, ToastModule, TableModule, FieldsetModule, DropdownModule, TreeSelectModule, FileUploadModule, CardModule, InputTextModule, ButtonModule, AppRoutingModule, FormsModule, HttpClientModule, provideFirebaseApp(() => initializeApp({"projectId":"angular-app-81946","appId":"1:404115279632:web:ac1fa58948a023be739f95","storageBucket":"angular-app-81946.appspot.com","apiKey":"AIzaSyCVXlHkEifSq3T5iEfzxnNWJxm2uaevsTU","authDomain":"angular-app-81946.firebaseapp.com","messagingSenderId":"404115279632"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())],
  providers: [
    MessageService,
    {provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: Auth401Interceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
