export interface EvenementI {
  titre: string;
  date: number | Date;
  places: number;
  horaires: HorairesI;
  media: MediaI;
  infos?: string;
}
interface HorairesI {
  debut: string;
  fin: string;
}
interface MediaI {
  src: string;
  alt: string;
}
