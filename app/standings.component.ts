import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import { standings } from './data-classes';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  constructor(private m: DataManagerService) { }
  TypeOfStandings: string = "NBA Standings";
  standings: standings[];
  ngOnInit(): void {
    this.m.getEastStandings().subscribe(response => this.standings = response);
  }

  public west() {
    this.m.getWestStandings().subscribe(response => this.standings = response);
    this.TypeOfStandings = "Western Conference Standings";
  }

  public east() {
    this.m.getEastStandings().subscribe(response => this.standings = response);
    this.TypeOfStandings = "Eastern Conference Standings";
  }

  public all() {
    this.m.getAllStandings().subscribe(response => this.standings = response);
    this.TypeOfStandings = "NBA Standings";
  }

  public sortWin() {
    console.log("here")
    this.standings.sort(this.compare);
  }

  private compare(a,b) {
    const winA = a.w;
    const winB = b.w;

    let comparison = 0;
    if (winA > winB)
      comparison = 1;
    else if (winA < winB)
      comparison = -1;
    return comparison;
  }
}
