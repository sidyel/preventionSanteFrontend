import {TypeActeur} from "./enum";
import {Campagne} from "./Campagne";

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeActeur: TypeActeur;
  region?: string;
  commune?: string;
  village?: string;
  dateCreation?: Date;
  actif?: boolean;
  campagnes?: Campagne[];
  notifications?: Notification[];
}
