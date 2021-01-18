import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataManagerService } from "./data-manager.service";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject, interval} from "rxjs";
import { team } from "./data-classes";
import { t } from "./teams";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pbp',
  templateUrl: './pbp.component.html',
  styleUrls: ['./pbp.component.css']
})
export class PbpComponent implements OnInit {
  pbp: any;
  vTeam;
  hTeam;
  qtr: string[];
  constructor(public sanitizer: DomSanitizer, private m: DataManagerService, private route: ActivatedRoute, private http: HttpClient) { 
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    let date = this.route.snapshot.params['date'];
    this.vTeam = this.route.snapshot.params['vTeam'];
    this.hTeam = this.route.snapshot.params['hTeam'];

    this.qtr =  ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter'];
    this.m.getPbp(date, id).subscribe(u => {
      let a = u.sports_content.game.play;
      a.reverse();
      let tmp = new Array();
      for (let i = 0; i < a.length; i++) {
        let obj = {qtr: this.ordinal_suffix_of(parseInt(a[i].period)) + " Quarter", team: a[i].team_abr, clock: a[i].clock, desc: a[i].description, id: a[i].person_id, homeScore: a[i].home_score, visitorScore: a[i].visitor_score}
        tmp.push(obj);
      }
      this.pbp = tmp;
    });
  }

  getLogo(abr) {
    return t.filter(obj => obj.abbreviation == abr)[0].altLogo;
  }
  ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

  getAltLogo(id) {
    return t.filter(obj => obj.abbreviation == id)[0].altLogo;
  }

  getShort(id) {
    return t.filter(obj => obj.abbreviation == id)[0].simpleName;
  }

  getClock(a) {
    console.log(a);
    return a == "" ? "12:00" : a;
  }
}
