import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.sass']
})
export class TopNavBarComponent implements OnInit {

  date: number = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
