import {StatusCampagne, TypeCampagne} from "./enum";
import {User} from "./User";
import {Message} from "./Message";
import {Alerte} from "./Alerte";

export interface Campagne {
  id?: number;
  nom: string;
  description?: string;
  typeCampagne: TypeCampagne;
  status?: StatusCampagne;
  dateDebut: Date;
  dateFin: Date;
  objectifs?: string;
  publicCible?: string;
  zonesGeographiques?: string;
  nombreParticipants?: number;
  progression?: number;
  budget?: number;
  dateCreation?: Date;
  user: User;
  messages?: Message[];
  alertes?: Alerte[];
}
