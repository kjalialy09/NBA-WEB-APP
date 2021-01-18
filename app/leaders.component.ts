import { Component, OnInit, ElementRef } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import {Rank, TeamRank} from './data-classes';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {

  constructor(private m: DataManagerService) { }
  p_pts: Rank[];
  p_reb: Rank[];
  p_ast: Rank[];
  p_stl: Rank[];
  p_blk: Rank[];
  p_min: Rank[];
  p_eff: Rank[];
  t_pts: TeamRank[];
  t_rebs: TeamRank[];
  t_ast: TeamRank[];
  t_stl: TeamRank[];
  t_blk: TeamRank[];
  t_fgp: TeamRank[];
  t_tpp: TeamRank[];
  t_ftp: TeamRank[];
  t_min: TeamRank[];
  t_pfpg: TeamRank[];
  t_oppg: TeamRank[];
  t_eff: TeamRank[];
  t_ortg: TeamRank[];
  t_drtg: TeamRank[];
  t_pace: TeamRank[];
  t_tov: TeamRank[];
  teamRank: TeamRank[];
  ngOnInit(): void {
    this.m.getPtsLeaders().subscribe(response => this.p_pts = response.splice(0, 5));
    this.m.getRebLeaders().subscribe(response => this.p_reb = response.splice(0, 5));
    this.m.getAstLeaders().subscribe(response => this.p_ast = response.splice(0, 5));
    this.m.getStlLeaders().subscribe(response => this.p_stl = response.splice(0, 5));
    this.m.getBlkLeaders().subscribe(response => this.p_blk = response.splice(0, 5));
    this.m.getMinLeaders().subscribe(response => this.p_min = response.splice(0, 5));
    this.m.getEffLeaders().subscribe(response => this.p_eff = response.splice(0, 5));
    this.m.getTeamRankings().subscribe(response => this.teamRank = response);
    this.m.sortPts().subscribe(response => this.t_pts = response.splice(0, 5));
    this.m.sortReb().subscribe(response => this.t_rebs = response.splice(0, 5));
    this.m.sortAst().subscribe(response => this.t_ast = response.splice(0, 5));
    this.m.sortStl().subscribe(response => this.t_stl = response.splice(0, 5));
    this.m.sortBlk().subscribe(response => this.t_blk = response.splice(0, 5));
    this.m.sortFgp().subscribe(response => this.t_fgp = response.splice(0, 5));
    this.m.sortTpp().subscribe(response => this.t_tpp = response.splice(0, 5));
    this.m.sortFtp().subscribe(response => this.t_ftp = response.splice(0, 5));
    this.m.sortMin().subscribe(response => this.t_min = response.splice(0, 5));
    this.m.sortPfpg().subscribe(response => this.t_pfpg = response.splice(0, 5));
    this.m.sortOppg().subscribe(response => this.t_oppg = response.splice(0, 5));
    this.m.sortEff().subscribe(response => this.t_eff = response.splice(0, 5));
    this.m.sortOrtg().subscribe(response => this.t_ortg = response.splice(0, 5));
    this.m.sortDrtg().subscribe(response => this.t_drtg = response.splice(0, 5));
    this.m.sortPace().subscribe(response => this.t_pace = response.splice(0, 5));
    this.m.sortTov().subscribe(response => this.t_tov = response.splice(0, 5));
  }

  scrollToPlayers() {
    var element = document.getElementById("players");
    element.scrollIntoView({behavior: 'smooth'});
  }

  scrollToTeams() {
    var element = document.getElementById("teams");
    element.scrollIntoView({behavior: 'smooth'});
  }
}
