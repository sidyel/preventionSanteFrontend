import {NiveauUrgence, TypeAlerte} from "./enum";
import {User} from "./User";
import {Campagne} from "./Campagne";
import {AlerteDestinataire} from "./AlerteDestinataire";

export interface Alerte {
  id?: number;
  titre: string;
  description: string;
  typeAlerte: TypeAlerte
  ;
  niveauUrgence: NiveauUrgence;
  zoneAffectee?: string;
  mesuresPreventives?: string;
  consignesSuivre?: string;
  dateCreation?: Date;
  dateExpiration?: Date;
  active?: boolean;
  expediteur: User;
  campagne?: Campagne;
  destinataires?: AlerteDestinataire[];
}
