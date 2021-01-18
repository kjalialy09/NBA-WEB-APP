import { Component, OnInit } from '@angular/core';
import { DataManagerService } from "./data-manager.service";
import {PlayerInfo} from './data-classes';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {

  constructor(private m: DataManagerService) { }
  playerinfo: PlayerInfo[];
  errorImg: string = "https://i.ibb.co/WVzrZFk/New-Project.jpg";
  player: "";
  ngOnInit(): void {
    this.m.getPlayers().subscribe(response => this.playerinfo = response);
  }

  public searchPlayers() {
    this.m.getPlayersByName(this.player).subscribe(response => this.playerinfo = response);
    console.log(this.playerinfo);
  }
  
}