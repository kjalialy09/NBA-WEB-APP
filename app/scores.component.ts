import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import {FormControl} from '@angular/forms';
import { team } from "./data-classes";
declare var $: any;

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  date;
  scores;
  teams: team[];
  noGames: boolean;
  constructor(private m: DataManagerService) {
    this.m.getTeam().subscribe(response => this.teams = response);
   }

  ngOnInit(): void {
    this.date = new Date();
    this.getDate()
    this.scores = null;
  }

  getDate() {
    if (this.date instanceof Date) {
      let tmp = new Date(this.date);
  
      let a = tmp.getFullYear().toString() + ('0' + (tmp.getMonth()+1)).slice(-2) + 
      ('0' + tmp.getDate()).slice(-2);
      this.m.getScores(a).subscribe(response => {
        if (response.numGames > 0) {
          this.noGames = false;
          this.scores = response.games
        } else {
          this.noGames = true;
          this.scores = "No games available on this date."
        }
      });
    }
  }

  convertToNum(num) {
    return parseInt(num);
  }

  public getName(id) {
    return this.teams.filter(obj => obj.teamId == id)[0].simpleName;
  }
  
  public getQtrByNumber(a) {

    if (a.statusNum == 1 && a.extendedStatusNum == 2) {
      return "PPD";
    }
    if (a.statusNum == 1) { 
      if (a.startTimeEastern == "") {
        return "TBD";
      }
      else {
        return a.startTimeEastern;
      }
     } // game has not started
    else if (a.statusNum == 3) { 
      return "Final"
    } // game finished
    else {
        if (a.period.isHalftime == true) return "Halftime";

        if (a.period.isEndOfPeriod == true) {
            if (a.period.current == 1) return "End 1st"
            else if (a.period.current == 2) return "End 2nd"
            else if (a.period.current == 3) return "End 3rd";
            else if (a.period.current == 4) return "End 4th";
            else if (a.period.current == 5) return "End 0T";
            else if (a.period.current == 6) return "End 2OT";
            else if (a.period.current == 7) return "End 3OT";
            else if (a.period.current == 8) return "End 4OT";
            else if (a.period.current == 9) return "End 5OT";
            else if (a.period.current == 10) return "End 6OT";
        }

        if (a.period.current == 1) return `1st ${a.clock}`;
        else if (a.period.current == 2) return `2nd ${a.clock}`;
        else if (a.period.current == 3) return `3rd ${a.clock}`;
        else if (a.period.current == 4) return `4th ${a.clock}`;
        else if (a.period.current == 5) return `OT ${a.clock}`;
        else if (a.period.current == 6) return `2OT ${a.clock}`;
        else if (a.period.current == 7) return `3OT ${a.clock}`;
        else if (a.period.current == 8) return `4OT ${a.clock}`;
        else if (a.period.current == 9) return `5OT ${a.clock}`;
        else if (a.period.current == 10) return `6OT ${a.clock}`;
        else return "7OT ${a.clock}";
  }
}
}
