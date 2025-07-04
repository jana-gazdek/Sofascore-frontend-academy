export interface Sport {
  id: number;
  name: string;
  slug: string;
}

export interface Country {
  id: number;
  name: string;
  slug: string;
}

export interface Tournament {
  id: number;
  name: string;
  slug: string;
  sport: Sport;
  country: Country; 
}

export interface Score {
  total: number;
  period1: number;
  period2: number;
  period3: number;
  period4: number;
  overtime: number;
}

export interface Event {
  id: number;
  slug: string;
  tournament: Tournament;
  homeTeam: Team;
  awayTeam: Team;
  status: string;
  startDate: string;
  homeScore: Score;
  awayScore: Score;
  winnerCode: string; 
  round: number;
}

export interface Team {
  id: number;
  name: string;
  country: {
    id: number; 
    name: string;
  };
  managerName: string; 
  venue: string;  
}

export interface Player {
  id: number;
  name: string;
  slug: string;
  country: {
    id: number; 
    name: string;
  };
  position: string;
}

export interface Incident {
  id: number;
  time: number;
  type: string; 
  player?: Player; 
  teamSide?: 'home' | 'away'; 
  color?: string; 
  scoringTeam?: 'home' | 'away';
  homeScore?: number;
  awayScore?: number;
  goalType?: string; 
  text?: string; 
}


export interface IncidentsResponse {
  incidents: Incident[]; 
}


export interface StandingRow {
  id: number;
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

export interface Standing {
  id: number; 
  tournament: Tournament; 
  type: string; 
  sortedStandingsRows: StandingRow[]; 
}
