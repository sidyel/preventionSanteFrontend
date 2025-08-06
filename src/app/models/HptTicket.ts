import {HptTicketStatus} from "./HptTicketStatus";
import {HptUser} from "./HptUser";
import {HptTarif} from "./HptTarif";

export interface HptTicket {
  id: number;
  ticketNumber: string;
  status: HptTicketStatus;
  appointmentDate: string;
  createdAt: string;
  totalPrice: number;
  user: HptUser;
  tarif: HptTarif;
}
