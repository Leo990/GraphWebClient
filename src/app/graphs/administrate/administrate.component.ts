import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Link } from 'src/app/models/link';
import { Node } from 'src/app/models/node';
import { fromEvent, Subscription } from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css'],
})
export class AdministrateComponent implements OnInit, OnDestroy {
  graph?: any;
  nodes: Node[] = [];
  links: Link[] = [];
  simulation?: d3.Simulation<Node, undefined>;
  link?: d3.Selection<SVGLineElement, Link, any, any>;
  node?: d3.Selection<SVGCircleElement, Node, any, any>;
  svg?: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  subscriptor?: Subscription;

  constructor(private ngZone: NgZone) {
    this.graph = JSON.parse(localStorage.getItem('Graph')!);
  }

  ngOnInit(): void {
    this.nodes = this.graph.nodes;
    this.initLinks();
    this.simulation = this.createSimulation();
    this.svg = this.createSVG();
    this.link = this.createLinks();
    this.node = this.createNodes();
    const obs = fromEvent(document.getElementsByClassName('graph')!, 'click');
    this.subscriptor = obs.subscribe((evt) => {
      typeof this.link !== 'undefined'
        ? this.link!.attr('x1', (d: Link) => d.Source.x!)
            .attr('x2', (d: Link) => d.Target.x!)
            .attr('y1', (d: Link) => d.Source.y!)
            .attr('y2', (d: Link) => d.Target.y!)
        : console.log('alv todo');

      typeof this.node !== 'undefined'
        ? this.node!.attr('cx', (d: Node) => d['x']!).attr('cy', (d) => d['y']!)
        : console.log('X2');
    });
  }

  initLinks(): void {
    var source: Node;
    var target: Node;
    const feo = new Node(1, '', {}, {}, 1, 1);
    this.graph.edges.forEach((element: any) => {
      this.nodes.forEach((item: Node) => {
        if (element.source == item.index) {
          source = item;
        }
        if (element.target == item.index) {
          target = item;
        }
      });
      this.links.push(
        new Link(
          element.index!,
          typeof source !== 'undefined' ? source : feo,
          typeof target !== 'undefined' ? target : feo,
          element.weight!
        )
      );
    });
  }

  createSimulation(): d3.Simulation<Node, undefined> {
    return d3
      .forceSimulation(this.nodes)
      .force('link', d3.forceLink(this.links))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
      .force('collide', d3.forceCollide(40));
  }

  createSVG() {
    return d3
      .select('.graph')
      .append('svg')
      .attr('width', 400)
      .attr('height', 600)
      .attr('viewBox', [-200, -300, 400, 600]);
  }

  createNodes(): d3.Selection<SVGCircleElement, Node, any, any> {
    return this.svg!.selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('cx', (d: Node) => d['x']!)
      .attr('cy', (d: Node) => d['y']!)
      .attr('r', 10);
  }

  createLinks(): d3.Selection<SVGLineElement, Link, any, any> {
    return this.svg!.selectAll('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .data(this.links)
      .enter()
      .append('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .attr('x1', (d: Link) => d.Source.x!)
      .attr('x2', (d: Link) => d.Target.x!)
      .attr('y1', (d: Link) => d.Source.y!)
      .attr('y2', (d: Link) => d.Target.y!);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('Graph');
    this.subscriptor?.unsubscribe();
  }

  ticket() {
    typeof this.link !== 'undefined'
      ? this.link!.attr('x1', (d: Link) => d.Source.x!)
          .attr('x2', (d: Link) => d.Target.x!)
          .attr('y1', (d: Link) => d.Source.y!)
          .attr('y2', (d: Link) => d.Target.y!)
      : console.log('alv todo');

    typeof this.node !== 'undefined'
      ? this.node!.attr('cx', (d: Node) => d['x']!).attr('cy', (d) => d['y']!)
      : console.log('X2');
  }
}
