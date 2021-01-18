import { Component, OnInit } from '@angular/core';
import {Rank, TeamRank} from './data-classes';
import { DataManagerService } from "./data-manager.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-team-leaders-detail',
  templateUrl: './team-leaders-detail.component.html',
  styleUrls: ['./team-leaders-detail.component.css']
})
export class TeamLeadersDetailComponent implements OnInit {
  rank: TeamRank[];
  typeOfStat: string;
  value: Number;
  sort;
  constructor(private m: DataManagerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sort = this.route.snapshot.params['id'];
    if (this.sort == 'PTS') {
      this.typeOfStat = "Points Per Game Leaders"
      this.m.sortPts().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'REB') {
      this.typeOfStat = "Rebounds Per Game Leaders"
      this.m.sortReb().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'AST') {
      this.typeOfStat = "Assists Per Game Leaders"
      this.m.sortAst().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'STL') {
      this.typeOfStat = "Steals Per Game Leaders"
      this.m.sortStl().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'BLK') {
      this.typeOfStat = "Blocks Per Game Leaders"
      this.m.sortBlk().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'MIN') {
      this.typeOfStat = "Minutes Per Game Leaders"
      this.m.sortMin().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'FGP') {
      this.typeOfStat = "Field Goal Percentage Leaders"
      this.m.sortFgp().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'TPP') {
      this.typeOfStat = "Three Point Percentage Leaders"
      this.m.sortTpp().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'FTP') {
      this.typeOfStat = "Free Throw Percentage Leaders"
      this.m.sortFtp().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'PFPG') {
      this.typeOfStat = "Personal Fouls Per Game Leaders"
      this.m.sortPfpg().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == "TOV") {
      this.typeOfStat = "Turnovers Per Game Leaders"
      this.m.sortTov().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'OPPG') {
      this.typeOfStat = "Opponent Points Per Game Leaders"
      this.m.sortOppg().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'ORTG') {
      this.typeOfStat = "Offensive Rating Leaders"
      this.m.sortOrtg().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'DRTG') {
      this.typeOfStat = "Defensive Rating Leaders"
      this.m.sortDrtg().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'PACE') {
      this.typeOfStat = "Average Pace Leaders"
      this.m.sortPace().subscribe(response => this.rank = response.splice(0, 15));
    }
    else if (this.sort == 'EFF') {
      this.typeOfStat = "Efficiency Per Game Leaders"
      this.m.sortEff().subscribe(response => this.rank = response.splice(0, 15));
    }
  }

}
