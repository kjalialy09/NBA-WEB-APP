import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import { team } from "./data-classes";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  scores;
  date;
  noGames: boolean;
  constructor(private m: DataManagerService) { }
  ngOnInit(): void {
    this.date = new Date();
    let str = this.date.getFullYear().toString() + ('0' + (this.date.getMonth()+1)).slice(-2) + 
    ('0' + this.date.getDate()).slice(-2);

    this.m.getScores(str).subscribe(response => {
      if (response.numGames > 0) {
        this.noGames = false;
        this.scores = response.games
      } else {
        this.noGames = true;
        this.scores = "No games available on this date."
      }
    });
  }

  getDate(date) {
    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    return `${this.short(date)}, ${monthNames[date.getMonth()]} ${date.getDate()}`; 
    //`${date.startDateEastern.substring(4,6)}/${date.startDateEastern.substring(6,8)} | ${date.startTimeEastern}`;
  }

  short(dt) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dt.getDay()];
  }

  convertToNum(num) {
    return parseInt(num);
  }

  getPlayoffs(p) {
    let a = p.playoffs;
    if (a.roundNum != '0') {
      if (a.isIfNecessary) {
        return `Game ${a.gameNumInSeries}, (If necessary)`
      } else {
        return `Game ${a.gameNumInSeries}, ${a.seriesSummaryText}`
      }
    }
    else {
      return a.seriesSummaryText;
    }
  }

  public getQtrByNumber(a) {
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
        else return "just stop playing for fuck sake";
  }
}
  

}
