import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private graphService: GraphService) {}

  graphs: Array<any> = [];
  subs?: Subscription;
  isExist: boolean = false;

  ngOnInit(): void {
    this.getGraphs();
    this.subs = interval(5).subscribe(() => {
      this.isExist = localStorage.getItem('Graph') != null;
    });
  }

  getGraphs(): void {
    this.graphService.getAllGraph().subscribe((res: any) => {
      this.graphs = res;
    });
  }

  setGraph() {
    var graph = {
      _id: {
        $oid: '',
      },
      name: 'Algun dia',
      nodes: [],
      edges: [],
    };
    localStorage.setItem('Graph', JSON.stringify(graph));
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
