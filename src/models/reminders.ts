import { Schedule } from "./schedule";
import { Station } from "./station";

export interface ReminderData {
  id: Schedule["id"];
  stationName: Station["name"];
  line: Schedule["line"];
  trainId: Schedule["trainId"];
  destination: Schedule["destination"];
  notificationIds: number[];
  days: number[];
  beforeMinutes: number;
  timeEstimated: Schedule["timeEstimated"];
}
export type ReminderStore = Record<string, ReminderData>;
