import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import {team, TeamRank} from './data-classes';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(private m: DataManagerService) { }
  team: team[];
  teamRank: TeamRank[];
  ngOnInit(): void {
    this.m.getTeam().subscribe(u => this.team = u);
    this.m.getTeamRankings().subscribe(u => this.teamRank = u);
  }

  public west() {
    this.m.getWest().subscribe(u => this.team = u);
  }

  public east() {
    this.m.getEast().subscribe(u => this.team = u);
  }

  public all() {
    this.m.getTeam().subscribe(u => this.team = u);
  }

}
