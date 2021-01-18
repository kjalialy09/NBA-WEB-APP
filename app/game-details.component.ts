import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataManagerService } from "./data-manager.service";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject, interval} from "rxjs";
import { PlayerInfo, team } from "./data-classes";
import { t } from "./teams";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  scoreInfo: any;
  qtr = ['1st', '2nd', '3rd', '4th', 'OT', '2OT', '3OT', '4OT', '5OT', '6OT', '7OT']
  teams: team[];
  youtube;
  currentDate;
  tmp: any;
  yt: any;
  woah;
  check;
  stealsLeader;
  blocksLeader;
  pbpPlay;
  hTeamInj;
  vTeamInj;
  hTeamColor: "#C8102E";

  constructor(public sanitizer: DomSanitizer, private m: DataManagerService, private route: ActivatedRoute, private http: HttpClient) { 
    //this.m.getTeam().subscribe(response => this.teams = response);
  }

  ngOnInit() :void {
    let id = this.route.snapshot.params['id'];
    let date = this.route.snapshot.params['date'];
    date = date.toString(); //hi
    
    this.currentDate = `${date.substring(4,6)}-${date.substring(6,8)}-${date.substring(0,4)}`;
    this.tmp = interval(3000).subscribe(obj => {
      this.getData(id, date)});
   // this.m.getScoresById(date, id).subscribe(u => this.scoreInfo = u);
   
   //this.scoreInfo = await this.http.get<any>(`http://data.nba.net/prod/v1/${date}/${id}_boxscore.json`).toPromise();

    //this.getVid();
  }

  getVid() {
    let vTeam = this.getShortName(this.scoreInfo.basicGameData.vTeam.teamId);
    let hTeam = this.getShortName(this.scoreInfo.basicGameData.hTeam.teamId);

    let str = `${vTeam} at ${hTeam} ${this.setDate()}`;

    console.log(str);
    return str;
    //this.m.getYtvid("raptors at celtics december 25 2019").subscribe(u => this.youtube = u[0]);
  }

  getPlayerName(a) {
    return `${a.firstName.substring(0,1)}. ${a.lastName}`;
  }

  getDate(date) {
    let d = new Date(this.scoreInfo.basicGameData.startTimeUTC);
    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

    
    return `${this.short(d)}, ${monthNames[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`; 
    //`${date.startDateEastern.substring(4,6)}/${date.startDateEastern.substring(6,8)} | ${date.startTimeEastern}`;
  }

  short(dt) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dt.getDay()];
  }

  validateActive(a) {
    return a.isOnCourt && this.scoreInfo.basicGameData.isGameActivated ? '🟢' : '';
  }

   getData(date, id) {
    this.m.getScoresById(id, date).subscribe(u => {
      if (this.validateObj(u)) {
        for (let i = 0; i < u.stats.activePlayers.length; i++) {
          if (u.stats.activePlayers[i].dnp) {
            u.stats.activePlayers.pop();
          }
        }
        //u.stats.activePlayers.sort((a,b) => (this.convertToNum(a.points) < this.convertToNum(b.points)) ? 1 : -1);
      }
      this.m.getPbp(id, date).subscribe(u => {
        this.pbpPlay = u.sports_content.game.play.reverse()[0]; // to get latest play, flip array
      })
      this.scoreInfo = u;

      this.m.getInjuriesByTeam(u.basicGameData.hTeam.triCode).subscribe(a => {
        this.hTeamInj = a;
      })

      this.m.getInjuriesByTeam(u.basicGameData.vTeam.triCode).subscribe(a => {
        this.vTeamInj = a;
      })
    }
      );  }
      
  getName(id) {
    let tmp =  t.filter(obj => obj.teamId == id)[0];
    return `${tmp.shortName} ${tmp.simpleName}`;
    //return t.filter(obj => obj.teamId == id)[0].teamName;
    //return this.teams.filter(obj => obj.teamId == id)[0].teamName;
  }

  getFullName(id) {
    return t.filter(obj => obj.teamId == id)[0].teamName;
  }
  getShortName(id) {
    return t.filter(obj => obj.teamId == id)[0].simpleName;
    //return this.teams.filter(obj => obj.teamId == id)[0].simpleName;
  }

  getOfficials(a) {
    let str = "";
    for (let i = 0; i < a.length; i++) {
      if (i == a.length - 1) {
        str += a[i].firstNameLastName;
      } else {
        str += a[i].firstNameLastName + ", ";
      }
    }
    return str;
  }

  getImg(name) {
    this.m.getPlayerName(name).subscribe(u => {
      let tmp = u;
      return tmp[0].pic;
    })
  }


  validateLineScore(qtr, obj, index) {
    if (obj.period.current == index + 1 && qtr == '0') {
      return '0';
    }

    if (qtr != '0') {
      return qtr;
    } else {
      return '-'
    }
    //return qtr == '0' ? '-' : qtr;
  }

  formatData(a) {
    return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  }


  validateObj(a) {
    return a.hasOwnProperty('stats') ? true : false;
  }

  /**
   * 
   * @param a stats object
   * checks if the length of the array in the leaders object are empty; if empty then it wont show the table that
   * includes the stats
   */
  validateLeaders(a) {
    let vPoints = a.vTeam.leaders.points.players.length <= 0;
    let vReb = a.vTeam.leaders.rebounds.players.length <= 0;
    let vAst = a.vTeam.leaders.assists.players.length <= 0;
    let hPoints = a.hTeam.leaders.points.players.length <= 0;
    let hReb = a.hTeam.leaders.rebounds.players.length <= 0;
    let hAst = a.hTeam.leaders.assists.players.length <= 0;
    return vPoints == false && vReb == false && vAst == false && hPoints == false && hReb == false && hAst == false ? true : false;
  }

  setDate() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date(this.currentDate);
    var a = `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;

    return a;
  }

  /**
   * calculate total stats (pts, reb, ast, stl, blk) to calculate best performances
   */
  getKeyPlayers(teamId) {
    let playerArr = new Array();


    for (let i = 0; i < this.scoreInfo.stats.activePlayers.length; i++) {
      let a = this.scoreInfo.stats.activePlayers[i];
      if (a.teamId == teamId) {
        let tmp = parseInt(a.points) + parseInt(a.totReb) + parseInt(a.assists) + parseInt(a.steals) + parseInt(a.blocks);
        playerArr.push({"name": `${a.firstName} ${a.lastName}`, "id": a.personId, "pts": parseInt(a.points), "reb": parseInt(a.totReb),
         "ast": parseInt(a.assists), "stl": parseInt(a.steals), "blk": parseInt(a.blocks), "total": tmp,
        "fgp": a.fgp, "tpp": a.tpp, "ftp": a.ftp})
      }
    }

    //console.log(playerArr.sort((a,b) => b.total - a.total))

    playerArr.sort((a,b) => b.total - a.total) //sort by the total 

    return playerArr[0];
  }

  getPlayoffs() {
    let a = this.scoreInfo.basicGameData.playoffs;
    if (a.roundNum == "1") {
      if (a.isIfNecessary) {
        return `${a.confName} 1st Round - Game ${a.gameNumInSeries}, (If necessary)`
      } else {
        return `${a.confName} 1st Round - Game ${a.gameNumInSeries}, ${a.seriesSummaryText}`
      }
    }
    else if (a.roundNum == "2") {
      if (a.isIfNecessary) {
        return `${a.confName}ern Semi-Finals - Game ${a.gameNumInSeries}, (If necessary)`
      } else {
        return `${a.confName}ern Semi-Finals - Game ${a.gameNumInSeries}, ${a.seriesSummaryText}`
      }
    }
    else if (a.roundNum == "3") {
      if (a.isIfNecessary) {
        return `${a.confName}ern Finals - Game ${a.gameNumInSeries}, (If necessary)`
      } else {
        return `${a.confName}ern Finals - Game ${a.gameNumInSeries}, ${a.seriesSummaryText}`
      }
    }
    else if (a.roundNum == "4") {
      if (a.isIfNecessary) {
        return `NBA Finals - Game ${a.gameNumInSeries}, (If necessary)`
      } else {
        return `NBA Finals - Game ${a.gameNumInSeries}, ${a.seriesSummaryText}`
      }
    }
    else {
      return a.seriesSummaryText;
    }
  }

  getBroadcasters() {
    let a = this.scoreInfo.basicGameData.watch.broadcast.broadcasters;
    let arr = new Array();
    if (a.national.length > 0) {
      arr.push(a.national[0].longName);
    }
    if (a.canadian.length > 0) {
      arr.push(a.canadian[0].longName);
    }
    if (a.vTeam.length > 0) {
      arr.push(a.vTeam[0].longName);
    }
    if (a.hTeam.length > 0) {
      arr.push(a.hTeam[0].longName);
    }

    const unique = new Set(arr);
    arr = [...unique]

    let str = "";
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        str += arr[i];
      } else {
        str += arr[i] + ", ";
      }
    }
    return str;
    //return arr;
  }

  /**
   * statusNum: 1 == game didnt start
   * statusNum: 2 == game is active
   * statusNum: 3 == game is finished
   */
  setQtr() {
    if (this.scoreInfo.basicGameData.statusNum == 1) { //* game didnt start
      return this.scoreInfo.basicGameData.startTimeEastern;
    }
    else if (this.scoreInfo.basicGameData.statusNum == 3) {
      if (this.scoreInfo.basicGameData.period.current > 4) {
        return "Final/OT"
      }
      else {
        return "Final";
      }
    }
    else {
      if (this.scoreInfo.basicGameData.period.isHalftime == true) return "Halftime";

      if (this.scoreInfo.basicGameData.period.isEndOfPeriod == true) {
        if (this.scoreInfo.basicGameData.period.current == 1) return "End of 1st"
        else if (this.scoreInfo.basicGameData.period.current == 2) return "End of 2nd"
        else if (this.scoreInfo.basicGameData.period.current == 3) return "End of 3rd";
        else if (this.scoreInfo.basicGameData.period.current == 4) return "End of 4th";
        else if (this.scoreInfo.basicGameData.period.current == 5) return "End of 0T";
        else if (this.scoreInfo.basicGameData.period.current == 6) return "End of 2OT";
        else if (this.scoreInfo.basicGameData.period.current == 7) return "End of 3OT";
        else if (this.scoreInfo.basicGameData.period.current == 8) return "End of 4OT";
        else if (this.scoreInfo.basicGameData.period.current == 9) return "End of 5OT";
        else if (this.scoreInfo.basicGameData.period.current == 10) return "End of 6OT";
      }
      if (this.scoreInfo.basicGameData.period.current == 1) return `1st Qtr ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 2) return `2nd Qtr ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 3) return `3rd Qtr ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 4) return `4th Qtr ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 5) return `OT ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 6) return `2OT ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 7) return `3OT ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 8) return `4OT ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 9) return `5OT ${this.scoreInfo.basicGameData.clock}`;
        else if (this.scoreInfo.basicGameData.period.current == 10) return `6OT ${this.scoreInfo.basicGameData.clock}`;
        else return "just stop playing for fuck sake";
    }

  }

  convertToNum(num) {
    return parseInt(num);
  }

  convertToFloat(num) {
    return parseFloat(num);
  }

  getYt() {
    this.m.getYtvid(`${this.getVid()}`).subscribe(u => {
      this.youtube = u[0]});

      return this.youtube;
  }

}

/*
<h5><b>Highlights</b></h5>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe allowfullscreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen" 
            msallowfullscreen="msallowfullscreen" 
            oallowfullscreen="oallowfullscreen" 
            webkitallowfullscreen="webkitallowfullscreen" src="https://www.youtube.com/embed/ZjNM8lNc3Ew" class = "embed-responsive-item"></iframe>
        </div>
 */

 /*
 <h5><b>Highlights</b></h5>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe class="e2e-iframe-trusted-src" allowfullscreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen" 
            msallowfullscreen="msallowfullscreen" 
            oallowfullscreen="oallowfullscreen" 
            webkitallowfullscreen="webkitallowfullscreen" src="{{getYt()}}" class = "embed-responsive-item"></iframe>
        </div>
 */

 /**
  <div id = "button-group" class="btn-group" role="group" aria-label="Basic example" style="width: 100%;">
                <button data-toggle="tooltip" data-placement="top" title="View {{getName(scoreInfo.basicGameData.vTeam.teamId)}} Boxscore" type="button" class="btn btn-dark"><b>{{getName(scoreInfo.basicGameData.vTeam.teamId)}}</b></button>
                <button data-toggle="tooltip" data-placement="top" title="View {{getName(scoreInfo.basicGameData.hTeam.teamId)}} Boxscore" type="button" class="btn btn-secondary"><b>{{getName(scoreInfo.basicGameData.hTeam.teamId)}}</b></button>
            </div>
  */