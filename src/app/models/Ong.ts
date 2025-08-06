import {User} from "./User";
import {DomaineIntervention} from "./enum";

export interface Ong {
  id?: number;
  user: User;
  nomOng: string;
  numeroEnregistrement?: string;
  domaineIntervention: DomaineIntervention;
  mission?: string;
  vision?: string;
  siteWeb?: string;
  nombreEmployes?: number;
  zonesIntervention?: string;
}
