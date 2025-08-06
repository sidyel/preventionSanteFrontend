import {User} from "./User";
import {Sexe} from "./enum";

export interface PopulationRurale {
  id?: number;
  user: User;
  profession?: string;
  age?: number;
  sexe?: Sexe;
  languePreferee?: string;
  alphabetise?: boolean;
  groupeCommunautaire?: string;
  personneContact?: string;
  telephoneContact?: string;
}
