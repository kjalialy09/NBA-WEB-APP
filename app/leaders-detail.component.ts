import { Component, OnInit } from '@angular/core';
import {Rank, TeamRank} from './data-classes';
import { DataManagerService } from "./data-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-leaders-detail',
  templateUrl: './leaders-detail.component.html',
  styleUrls: ['./leaders-detail.component.css']
})
export class LeadersDetailComponent implements OnInit {

  constructor(private m: DataManagerService, private route: ActivatedRoute) { }
  rank: Rank[];
  typeOfStat: string;
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id == 'PTS') {
      this.typeOfStat = "Points Per Game Leaders";
      this.m.getPtsLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'REB') {
      this.typeOfStat = "Rebounds Per Game Leaders";
      this.m.getRebLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'AST') {
      this.typeOfStat = "Assists Per Game Leaders";
      this.m.getAstLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'STL') {
      this.typeOfStat = "Steals Per Game Leaders";
      this.m.getStlLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'BLK') {
      this.typeOfStat = "Blocks Per Game Leaders";
      this.m.getBlkLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'MIN') {
      this.typeOfStat = "Minutes Per Game Leaders";
      this.m.getMinLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
    else if (id == 'EFF') {
      this.typeOfStat = "Efficiency Per Game Leaders";
      this.m.getEffLeaders().subscribe(response => this.rank = response.splice(0, 25));
    }
  }

}
