import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataManagerService } from "./data-manager.service";

import { PlayerInfo, PlayerStats, CareerStats, PlayerAwards } from "./data-classes";
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  playerinfo: PlayerInfo;
  playerstats: PlayerStats[];
  careerstats: CareerStats;
  awards: PlayerAwards[];
  errorImg: string = "https://i.ibb.co/WVzrZFk/New-Project.jpg";
  constructor(private m: DataManagerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.m.getPlayerById(id).subscribe(u => this.playerinfo = u);
    this.m.getPlayerStats(id).subscribe(u => this.playerstats = u);
    this.m.getCareerStats(id).subscribe(u => this.careerstats = u);
    this.m.getPlayerAwards(id).subscribe(u => this.awards = u);
  }

  public listNames() {
    let a = "";
    for (let i = 0; i < this.playerinfo.teams.length; i++) {
      if (i < this.playerinfo.teams.length - 1) {
        a += this.playerinfo.teams[i] + ", ";
      }
      else {
        a += this.playerinfo.teams[i];
      }
    }
    return a;
}
}
