import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  p: number = 1;

  @Input('list')
  listGraphs: Array<any> = [];

  constructor() {}

  setGraph(graph: any) {
    //console.log(graph._id.$oid);
    localStorage.setItem('Graph', JSON.stringify(graph));
  }
}
