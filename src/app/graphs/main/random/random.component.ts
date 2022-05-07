import { Component, OnInit, Output } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
})
export class RandomComponent {
  constructor(private graphService: GraphService) {}

  setRandomGraph(): any {
    return this.graphService.getRandomGraph().subscribe((res) => {
      this.setGraph(res);
    });
  }

  setGraph(graph: any) {
    graph['_id'] = {
      $oid: '',
    };
    localStorage.setItem('Graph', JSON.stringify(graph));
  }
}
