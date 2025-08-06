import {User} from "./User";
import {Message} from "./Message";

export interface MessageDestinataire {
  id?: number;
  message: Message;
  destinataire: User;
  lu?: boolean;
  dateLecture?: Date;
  dateReception?: Date;
}
