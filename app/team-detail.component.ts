import { Component, OnInit, ElementRef } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import {PlayerInfo, team, coach, TeamLeaders, standings, TeamRank} from './data-classes';
import { ActivatedRoute,NavigationEnd, Router  } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

import { t } from "./teams";

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  players: PlayerInfo[];
  team: team;
  coaches: coach[];
  standings: standings[];
  teamStats: TeamRank[];
  leaders: TeamLeaders;
  schedule: any;
  teamId;
  errorImg: string = "https://i.ibb.co/WVzrZFk/New-Project.jpg";
  headElements = ['YEAR', 'PPG', 'TRPG', 'APG', 'SPG', 'BPG', 'TPG', 'FGP', 'TPP',
                  'FTA', 'ORPG', 'DRPG', 'PF', 'ORTG', 'DRTG', 'EFF', 'PACE']
  constructor(public sanitizer: DomSanitizer, private m: DataManagerService, private route: ActivatedRoute, private router: Router) {
   }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.teamId = id;
    this.m.getTeamById(id).subscribe(u => this.team = u);
    this.m.getPlayersByTeam(id).subscribe(u => this.players = u);
    this.m.getCoachesByTeam(id).subscribe(u => this.coaches = u);
    this.m.getTeamLeadersByTeam(id).subscribe(u => this.leaders = u);
    this.m.getDivisionStandings(id).subscribe(u => this.standings = u);
    this.m.getTeamRankingsByTeam(id).subscribe(u => this.teamStats = u);
    this.m.getSchedule(id).subscribe(a => {
      let tmp = new Array();
      let length = a.league.lastStandardGamePlayedIndex;
      //console.log(length);

      for (let i = length + 1; i <= length + 5; i++) { //* get first 5 games
        tmp.push(a.league.standard[i]);
      }

      tmp = tmp.filter(function (element) { return element !== undefined})

      this.schedule = tmp;
    })
  }

  getTwitter() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://twitter.com/${this.team.twitter}?ref_src=twsrc%5Etfw`);
  }

  sanitize() {
    return this.sanitizer.bypassSecurityTrustScript(`https://platform.twitter.com/widgets.js`);
  }
  getName(id) {
    if (id.isHomeTeam) {
      return t.filter(obj => obj.teamId == id.vTeam.teamId)[0].simpleName;
    } else {
      return t.filter(obj => obj.teamId == id.hTeam.teamId)[0].simpleName;
    }
  }

  getAltName(id) {

    if (id.isHomeTeam) {
      return t.filter(obj => obj.teamId == id.vTeam.teamId)[0].altLogo;
    } else {
      return t.filter(obj => obj.teamId == id.hTeam.teamId)[0].altLogo;
    }
    //return t.filter(obj => obj.teamId == id)[0].abbreviation;
  }

  checkHome(a) {
    if (a.isHomeTeam) {
      return 'vs'
    } else {
      return '@'
    }
  }

  checkIfLive(a) {
    if (a.statusNum == 1) { //game has not started
      return a.startTimeEastern;
    }
    else if (a.statusNum == 3) {
      if (this.checkHome(a) == 'vs') { //@ home
        if (parseInt(a.hTeam.score) > parseInt(a.vTeam.score)) {
          return `${a.vTeam.score}-${a.hTeam.score} | W`
        } else {
          return `${a.vTeam.score}-${a.hTeam.score} | L`
        }
      } else {
        if (parseInt(a.vTeam.score) > parseInt(a.hTeam.score)) {
          return `${a.vTeam.score}-${a.hTeam.score} | W`
        } else {
          return `${a.vTeam.score}-${a.hTeam.score} | L`
        }
      }
    }
    else if (a.statusNum == 2) {
      return `${a.vTeam.score}-${a.hTeam.score}`
    }
  }
  getDate(date) {
    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    let d = new Date(date.startTimeUTC);
    return `${this.short(d)}, ${monthNames[d.getMonth()]} ${d.getDate()}`; 
    //`${date.startDateEastern.substring(4,6)}/${date.startDateEastern.substring(6,8)} | ${date.startTimeEastern}`;
  }

  short(dt) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dt.getDay()];
  }
  getLogo(id) {
    return t.filter(obj => obj.teamId == id)[0].altLogo;
  }

  getHeadCoach() {
    for (let i = 0; i < this.coaches.length; i++){
      if (this.coaches[i].position == "Head Coach") return this.coaches[i].name;
    }
  }

  getAssistant() {
    let a = "";
    for (let i = 0; i < this.coaches.length; i++){
      if (this.coaches[i].position == "Assistant Coach") {
        if (i < this.coaches.length - 1) {
          a += this.coaches[i].name + ', ';
        } else {
          a += this.coaches[i].name ;
        }
      }
    }
    return a;
  }

  scrollToDivision() {
    var element = document.getElementById("division");
    element.scrollIntoView({behavior: 'smooth'});
  }

  scrollToRoster() {
    var element = document.getElementById("teamRoster");
    element.scrollIntoView({behavior: 'smooth'});
  }
  scrollToLeaders() {
    var element = document.getElementById("leadersRow");
    element.scrollIntoView({behavior: 'smooth'});
  }

  public changeState(id) {
    this.m.getTeamById(id).subscribe(u => this.team = u);
  }

}
