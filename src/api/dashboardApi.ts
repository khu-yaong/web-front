import axios from "axios";

export interface SummaryStats {
  R: string;
  B: string;
  E: string;
  H: string;
}

export interface BaseRunners {
  "1Base": string;
  "2Base": string;
  "3Base": string;
}

export interface MatchInfo {
  homeTeam: string;
  homeScore: string;
  homeLogo: string;
  awayTeam: string;
  awayScore: string;
  awayLogo: string;
  inning: string;
  date: string;
  time: string;
  stadium: string;
  pitcherHome: string;
  pitcherAway: string;
  inningScoresHome: string[];
  inningScoresAway: string[];
  formattedInningScoresHome: string[][];
  formattedInningScoresAway: string[][];
  summaryStats: SummaryStats[];
  ballCount: number;
  strikeCount: number;
  outCount: number;
  baseRunners: BaseRunners;
}

export const fetchMatchInfo = async (): Promise<MatchInfo> => {
  const API_URL = "http://34.237.154.47:8080/api/fetch-aspx?id=20240815LGHH0";
  const TOKEN = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = response.data.data;
    console.log("dashboard: ", data);

    return {
      homeTeam: data.teams.homeTeam.teamInfo.teamName,
      homeScore: data.liveBroadcast.homeScore,
      homeLogo: data.teams.homeTeam.teamInfo.teamEmblem,
      awayTeam: data.teams.awayTeam.teamInfo.teamName,
      awayScore: data.liveBroadcast.awayScore,
      awayLogo: data.teams.awayTeam.teamInfo.teamEmblem,
      inning: data.inning,
      date: data.groundInfo.split(" ")[0],
      time: data.groundInfo.split(" ")[1],
      stadium: data.groundInfo.split(" ")[3],
      pitcherHome: data.teams.homeTeam.pitchers[0]?.name || "N/A",
      pitcherAway: data.teams.awayTeam.pitchers[0]?.name || "N/A",
      inningScoresHome: data.liveBroadcast.inningScores[1],
      inningScoresAway: data.liveBroadcast.inningScores[0],
      formattedInningScoresHome: data.liveBroadcast.inningScores[1].map(
        (score: string) => score.split("")
      ),
      formattedInningScoresAway: data.liveBroadcast.inningScores[0].map(
        (score: string) => score.split("")
      ),
      summaryStats: data.liveBroadcast.summaryStats,
      ballCount: data.currentPlay.ballCount,
      strikeCount: data.currentPlay.strikeCount,
      outCount: data.currentPlay.outCount,
      baseRunners: data.currentPlay.baseRunners,
    };
  } catch (error) {
    console.error("Error fetching match info:", error);
    throw error;
  }
};
