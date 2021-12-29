import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-daterange',
  templateUrl: './custom-daterange.component.html',
  styleUrls: ['./custom-daterange.component.css']
})
export class CustomDaterangeComponent implements OnInit {
    @Input() callbackFunc!: Function;

  constructor() { }

  ngOnInit(): void {
  }

  date: Date[] = [];

  onChange(result: Date[]): void {
    this.date = result;
  }

  getResult() {
      return this.date;
  }

}
