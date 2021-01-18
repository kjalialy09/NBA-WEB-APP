import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject, throwError} from "rxjs";
import { catchError, tap, retry } from "rxjs/operators";

import { PlayerInfo, team, PlayerStats, CareerStats, coach, TeamLeaders, standings, Rank, TeamRank, PlayerAwards } from './data-classes';

@Injectable({
    providedIn: 'root'
})

export class DataManagerService {
    //Inject the HttpClient
    constructor(private http: HttpClient) { }
    private url: string = 'https://stormy-plateau-41535.herokuapp.com';
    private urlReqres: string = "https://stormy-plateau-41535.herokuapp.com";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        })
    };

    private _refreshNeeds = new Subject<void>();

    get refreshNeeds() {
        return this._refreshNeeds;
    }

    // Error handler, from the Angular docs
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getYoutube(str): Observable<any> {
        return this.http.get<any>(`${this.url}/ytvid/${str}`);
    }

    getInjuriesByTeam(id): Observable<any> {
        return this.http.get<any>(`${this.url}/injuries/${id}`, this.httpOptions);
    }

    
    getScores(date): Observable<any> {
        return this.http.get<any>(`https://data.nba.net/prod/v1/${date}/scoreboard.json`)
        .pipe(
            retry(1),
            catchError(this.handleError)
          );
    }

    getScoresById(date, id): Observable<any> {
        return this.http.get<any>(`https://data.nba.net/prod/v1/${date}/${id}_boxscore.json`, this.httpOptions);
    }

    getSchedule(id): Observable<any> {
        return this.http.get<any>(`https://data.nba.net/prod/v1/2020/teams/${id}/schedule.json`);
    }

    getPlayers(): Observable<PlayerInfo[]> {
        return this.http.get<PlayerInfo[]>(`${this.url}/players`)
    }

    getYtvid(str): Observable<any>{
        return this.http.get<any>(`${this.url}/ytvid/${str}`);
    }

    getPbp(date, id): Observable<any> {
        return this.http.get<any>(`https://data.nba.net/data/10s/json/cms/noseason/game/${date}/${id}/pbp_all.json`);
    }

    getPlayerById(id): Observable<PlayerInfo> {
        return this.http.get<PlayerInfo>(`${this.url}/playersId/${id}`);
    }

    getTeam(): Observable<team[]> {
        return this.http.get<team[]>(`${this.url}/teams`)
    }

    getTeamById(id): Observable<team> {
        return this.http.get<team>(`${this.url}/teams/${id}`)
    }

    getPlayersByName(str: string): Observable<PlayerInfo[]> {
        return this.http.get<PlayerInfo[]>(`${this.url}/players/${str}`)
    }

    getPlayerName(str: string): Observable<PlayerInfo> {
        return this.http.get<PlayerInfo>(`${this.url}/players/${str}`)
    }

    getPlayerStats(id): Observable<PlayerStats[]> {
        return this.http.get<PlayerStats[]>(`${this.url}/playerstats/${id}`);
    }

    getCareerStats(id): Observable<CareerStats> {
        return this.http.get<CareerStats>(`${this.url}/careerstats/${id}`);
    }

    getPlayersByTeam(id): Observable<PlayerInfo[]> {
        return this.http.get<PlayerInfo[]>(`${this.url}/teams/players/${id}`);
    }

    getCoachesByTeam(id): Observable<coach[]> {
        return this.http.get<coach[]>(`${this.url}/coaches/${id}`);
    }

    getTeamLeadersByTeam(id): Observable<TeamLeaders> {
        return this.http.get<TeamLeaders>(`${this.url}/teams/leaders/${id}`);
    }

    getEastStandings(): Observable<standings[]> {
        return this.http.get<standings[]>(`${this.url}/standings/east`);
    }

    getWestStandings(): Observable<standings[]> {
        return this.http.get<standings[]>(`${this.url}/standings/west`);
    }

    getAllStandings(): Observable<standings[]> {
        return this.http.get<standings[]>(`${this.url}/standings`);
    }

    getEast(): Observable<team[]> {
        return this.http.get<team[]>(`${this.url}/east`);
    }

    getWest(): Observable<team[]> {
        return this.http.get<team[]>(`${this.url}/west`);
    }

    getDivisionStandings(id): Observable<standings[]> {
        return this.http.get<standings[]>(`${this.url}/division/${id}`);
    }

    getPtsLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=PTS`);
    }

    getRebLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=REB`);
    }

    getAstLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=AST`);
    }

    getStlLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=STL`);
    }

    getBlkLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=BLK`);
    }

    getMinLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=MIN`);
    }

    getEffLeaders(): Observable<Rank[]> {
        return this.http.get<Rank[]>(`${this.url}/leaders?mode=PerGame&scope=RS&season=2019-20&type=Regular%20Season&category=EFF`);
    }

    getTeamRankings(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/teamRankings`);
    }

    getTeamRankingsByTeam(id): Observable<TeamRank[]> {
        return this.http.get<TeamRank[]>(`${this.url}/teamRankings/${id}`);
    }

    sortPts(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/PPG`);
    }

    sortReb(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/TRPG`);
    }

    sortAst(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/APG`);
    }

    sortStl(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/SPG`);
    }

    sortBlk(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/BPG`);
    }

    sortFgp(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/FGP`);
    }

    sortTpp(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/TPP`);
    }

    sortFtp(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/FTP`);
    }

    sortMin(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/MPG`);
    }

    sortPfpg(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/PFPG`);
    }

    sortOppg(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/OPPG`);
    }

    sortEff(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/EFF`);
    }

    sortOrtg(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/ORTG`);
    }

    sortDrtg(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/DRTG`);
    }

    sortPace(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/PACE`);
    }

    sortTov(): Observable<TeamRank[]>{
        return this.http.get<TeamRank[]>(`${this.url}/sortedTeamRankings/TPG`);
    }

    getPlayerAwards(id): Observable<PlayerAwards[]> {
        return this.http.get<PlayerAwards[]>(`${this.url}/awards/${id}`);
    }
}

