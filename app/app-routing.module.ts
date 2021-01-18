import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home.component";
import {PlayersComponent} from './players.component';
import {TeamsComponent} from './teams.component';
import {StandingsComponent} from './standings.component';
import {ScoresComponent} from './scores.component';
import {PlayerDetailComponent} from './player-detail.component';
import {TeamDetailComponent} from './team-detail.component';
import {MyBarChartComponent} from './my-bar-chart.component';
import { LeadersComponent } from './leaders.component';
import { LeadersDetailComponent } from './leaders-detail.component';
import { TeamLeadersDetailComponent } from './team-leaders-detail.component';
import { GameDetailsComponent } from './game-details.component';
import { PbpComponent } from './pbp.component';
import { ScheduleComponent} from './schedule.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/detail/:id', component: PlayerDetailComponent},
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/detail/:id', component: TeamDetailComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'bar', component: MyBarChartComponent },
  { path: 'leaders', component: LeadersComponent },
  { path: 'leaders/players/:id', component: LeadersDetailComponent },
  { path: 'leaders/teams/:id', component: TeamLeadersDetailComponent },
  { path: 'scores/:date/:id', component: GameDetailsComponent },
  { path: 'pbp/:vTeam/:hTeam/:date/:id', component: PbpComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
