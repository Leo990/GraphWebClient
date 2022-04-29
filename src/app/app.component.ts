import { OnInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { Link } from './models/link';
import { Node } from './models/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
