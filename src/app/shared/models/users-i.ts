import { Timestamp } from "@angular/fire/firestore";


export interface UsersI {
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  statut: string;
  emailverified?: boolean;
  token?: string;
  tel?: string;
  mobile?: string;
  dateCreation: number;
  infos?: string;
  avatar: string;
  lastlogin: Number;
  uid?: string;
}
export interface FireUsersI {
  accessToken?: string;
  displayName?: string;
  email?: string;
  emailverified?: boolean;
  isAnonymous?: boolean;
  metadata?: Metadata;
  uid?: string;
  phoneNumber?: string;
  photoUrl?: string;  
}

interface Metadata{
  createdAt: Timestamp;
  creationTime: Date; 
  lastLoginAt: Timestamp
  lastSignInTime: Date
}



export interface ContactI {
message: any;
  nom: string;
  prenom: string;
  age: number;
  adresse: adresseI;
  tel: string;
  mobile: string;
  email: string;
  infos?: string;
}

interface adresseI {
  rue: string;
  codePostal: string;
  ville: string;
}
