
// src/app/models/dashboard.model.ts
import {Campagne} from "./Campagne";
import {Message} from "./Message";
import {Alerte} from "./Alerte";

export interface DashboardData {
  stats?: any;
  recentCampaigns?: Campagne[];
  unreadMessages?: number;
  unreadAlertes?: number;
  unreadNotifications?: number;
  recentMessages?: Message[];
  recentAlertes?: Alerte[];
}
