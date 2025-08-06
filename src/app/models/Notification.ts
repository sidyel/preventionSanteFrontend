import {TypeNotification} from "./enum";
import {User} from "./User";

export interface Notification {
  id?: number;
  titre: string;
  contenu?: string;
  typeNotification: TypeNotification;
  dateCreation?: Date;
  lu?: boolean;
  dateLecture?: Date;
  urlAction?: string;
  destinataire: User;
}
