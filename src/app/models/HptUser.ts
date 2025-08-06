import {HptTicket} from "./HptTicket";

export interface HptUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  tickets?: HptTicket[];
}

export interface HptCreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}
