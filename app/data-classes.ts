export class PlayerInfo {
    pic: string;
    fName: string;
    lName: string;
    playerId: string;
    teamId: string;
    jersey: string;
    pos: string;
    heightF: string;
    heightI: string;
    weight: string;
    draftYr: string;
    draftPick: string;
    draftRound: string;
    yearsPro: string;
    college: string;
    hs: string;
    teams: string[];
    teamUrl: string;
    teamName: string;
    simpleTeamName: string;
}

export class PlayerStats {
    seasonYear: Number;
    PlayerId: string;
    teamID: string;
    PointsPerGame: string;
    ReboundsPerGame: string;
    AssistsPerGame: string;
    StealsPerGame: string;
    BlocksPerGame: string;
    TurnoversPerGame: string;
    MinutesPerGame: string;
    TotalOREB: string;
    TotalDREB: string;
    FGPercentage: string;
    ThreePtPercentage: string;
    FTPercentage: string;
    FGM: string;
    FGA: string;
    FTM: string;
    FTA: string;
    FG3M: string;
    FG3A: string;
    teamAbb: string;
    gamesPlayed: Number;
}

export class CareerStats {
    PlayerID: string;
    PointsPerGame: string;
    ReboundsPerGame: string;
    AssistsPerGame: string;
    StealsPerGame: string;
    BlocksPerGame: string;
    TurnoversPerGame: string;
    MinutesPerGame: string;
    FGPercentage: string;
    ThreePtPercentage: string;
    FTPercentage: string;
    totalPoints: string;
    totalRb: string;
    totalAst: string;
    totalStl: string;
    totalBk: string;
    min: string;
    gamesPlayed: string;
    DoubleDouble: string;
    TripleDouble: string;
}

export class team {
    teamId: Number;
    abbreviation: string;
    teamName: string;
    simpleName: string;
    location: string;
    logoUrl: string;
    conference: string;
    division: string;
    position: string;
    altLogo: string;
    twitter: string;
}

export class coach {
    name: string;
    position: string;
}

export class TeamLeaders {
    ptsId: PlayerInfo;
    ptsValue: string;
    rbsId: PlayerInfo;
    rbsValue: string;
    astId: PlayerInfo;
    astValue: string;
    fgpId: PlayerInfo;
    fgpValue: string;
    ttpId: PlayerInfo;
    ttpValue: string;
    ftpId: PlayerInfo;
    ftpValue: string;
    stlId: PlayerInfo;
    stlValue: string;
    blkId: PlayerInfo;
    blkValue: string;
}

export class standings {
    teamID: string;
    w: string;
    l: string;
    pct: string;
    gb: string;
    homeW: string;
    homeL: string;
    awayW: string;
    awayL: string;
    last10W: string;
    last10L: string;
    streak: string;
    isWinStreak: boolean;
    logoUrl: string;
    teamName: string;
    teamAbb: string;
    pos: Number;
    logoAlt: string;
}

export class Rank {
    playerId: Number;
    pic: string;
    category: string;
    name: string;
    rank: Number;
    value: Number;
    url: string;
}

export class TeamRank {
    name: string;
    nickname: string;
    id: string;
    min: Number;
    fgp: Number;
    tpp: Number;
    ftp: Number;
    orpg: Number;
    drpg: Number;
    trpg: Number;
    apg: Number;
    tpg: Number;
    spg: Number;
    bpg: Number;
    pfpg: Number;
    ppg: Number;
    oppg: Number;
    eff: Number;
    ortg: Number;
    drtg: Number;
    pace: Number;
    url: string;
    abb:string;
    year: Number;
}

export class TeamPlayerStats {
    ppg: string;
    rpg: string;
    apg: string;
    mpg: string;
    topg: string;
    spg: string;
    bpg: string;
    tpp: string;
    ftp: string;
    fgp: string;
    assists: string;
    blocks: string;
    steals: string;
    turnovers: string;
    offReb: string;
    defReb: string;
    totReb: string;
    fgm: string;
    fga: string;
    tpm: string;
    tpa: string;
    ftm: string;
    fta: string;
    pFouls: string;
    points: string;
    gamesPlayed: string;
    gamesStarted: string;
    plusMinus: string;
    min: string;
    dd2: string;
    td3: string;
    playerId: string;
    name: string;
}

export class PlayerAwards {
    desc: string;
    amount: any;
}
