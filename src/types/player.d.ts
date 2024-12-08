export interface BaseballPlayer {
  playerId: number;
  name: string;
  team: string | null;
  no: number | null;
  position: string;
  birth: string;
  hwSpec: string;
  avg: number | null;
  ops: number | null;
  era: number | null;
  ip: string | null;
  profile: string;
}
