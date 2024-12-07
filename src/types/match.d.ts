export interface Batter {
  hits: string;
  ab: string;
  name: string;
  position: string;
  runs: string;
}

export interface Pitcher {
  hits: string;
  earnedRuns: string;
  name: string;
  innings: string;
  strikeOuts: string;
}

export interface TeamInfo {
  teamName: string;
  teamEmblem: string;
}

export interface Team {
  teamInfo: TeamInfo;
  batters: Batter[];
  pitchers: Pitcher[];
}

export interface GameData {
  teams: {
    awayTeam: Team;
    homeTeam: Team;
  };
}
