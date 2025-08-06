import {PrioriteMessage, TypeMessage} from "./enum";
import {User} from "./User";
import {Campagne} from "./Campagne";
import {MessageDestinataire} from "./MessageDestinataire";

export interface Message {
  id?: number;
  titre: string;
  contenu: string;
  typeMessage: TypeMessage
  ;
  priorite?: PrioriteMessage;
  langue?: string;
  pieceJointe?: string;
  urlImage?: string;
  urlVideo?: string;
  dateCreation?: Date;
  dateEnvoi?: Date;
  envoye?: boolean;
  expediteur: User;
  campagne?: Campagne;
  destinataires?: MessageDestinataire[];
}
