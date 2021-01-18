import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  bruh: "woah"
  ngOnInit(): void {
    let arr = ['', "#0E2240", "#CE1141", "#FDB927", "#C8102E", "#002B5C", "#007A33", "#C4CED4", "#002D62"];
    let vCounter = 1;
    for (let i = 1; i <= arr.length - 1; i++) {
      document.getElementsByTagName("button")[i].setAttribute("id",`${vCounter.toString()}`);
      document.getElementById(`${vCounter.toString()}`).style.backgroundColor=`${arr[i]}`;
      vCounter++;
    }
  }

}
