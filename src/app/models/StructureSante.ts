import {User} from "./User";
import {TypeStructure} from "./enum";

export interface StructureSante {
  id?: number;
  user: User;
  nomStructure: string;
  typeStructure: TypeStructure;
  numeroAgrement?: string;
  description?: string;
  adresse?: string;
  capaciteAccueil?: number;
  specialites?: string;
}
