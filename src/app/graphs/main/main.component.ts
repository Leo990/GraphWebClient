import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  graphs: Array<any> = [];

  ngOnInit(): void {
    this.getGraphs();
  }

  getGraphs(): void {
    this.graphService.getAllGraph().subscribe((res: any) => {
      this.graphs = res;
    });
  }

  setGraph() {
    var graph = {
      name: 'Algun dia',
      nodes: [],
      edges: [],
    };
    localStorage.setItem('Graph', JSON.stringify(graph));
  }
}
