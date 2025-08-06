import {HptServiceCategory} from "./HptServiceCategory";
import {HptTarif} from "./HptTarif";

export interface HptService {
  id: number;
  name: string;
  description?: string;
  category: HptServiceCategory;
  hospitalId: number;
  hospitalName: string;
  tarifs?: HptTarif[];
}
