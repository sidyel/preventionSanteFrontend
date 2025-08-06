import {HptServiceModel} from "./HptServiceModel";

export interface HptHospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  services?: HptServiceModel[];
}
