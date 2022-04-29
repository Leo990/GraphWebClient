import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input('list')
  listGraphs: Array<any> = [];

  constructor() {}

  setGraph(graph: any) {
    localStorage.setItem('Graph', JSON.stringify(graph));
  }
}
