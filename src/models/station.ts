export interface Station {
  id: string;
  daop: number;
  name: string;
  fgEnable: number;
  haveSchedule: boolean;
  updatedAt: string;
}

export interface StationLS extends Station {
  savedAt: string;
}
