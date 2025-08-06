import {Alerte} from "./Alerte";
import {User} from "./User";

export interface AlerteDestinataire {
  id?: number;
  alerte: Alerte;
  destinataire: User;
  lu?: boolean;
  dateLecture?: Date;
  dateReception?: Date;
  accuse?: boolean;
  dateAccuse?: Date;
}
