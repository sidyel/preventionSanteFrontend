import {HptTarifModel} from "./HptTarifModel";

export interface HptServiceModel {
  id: number;
  name: string;
  description?: string;
  category: string;
  hospitalId: number;
  hospitalName: string;
  tarifs?: HptTarifModel[];
}
