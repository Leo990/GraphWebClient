import { Component, OnInit, Input } from '@angular/core';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input('graph')
  graph!: Graph;

  constructor() {}

  ngOnInit(): void {}
}
