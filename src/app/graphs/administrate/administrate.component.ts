import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from 'src/app/models/link';
import { Node } from 'src/app/models/node';
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

  constructor() {
    this.graph = JSON.parse(localStorage.getItem('Graph')!);
  }

  ngOnInit(): void {
    this.nodes = this.graph.nodes;
    this.simulation = this.createSimulation();

    var svg = this.createSVG();

    this.createNodes(svg);

    this.initLinks();

    this.createLinks(svg);
  }

  initLinks(): void {
    var source;
    var target;
    const feo = new Node(1, '', {}, {}, 1, 1);
    var index;
    var sources: Array<Node> = [];
    var targets = [];
    this.graph.edges.forEach((element: any, index: number) => {
      sources.push(this.nodes.find((item) => (item.index = element.source))!);
    });
    console.log(sources);
    this.graph.edges.forEach((element: any, index: number) => {
      targets.push(this.nodes.find((item) => (item.index = element.target)));
    });

    /* this.links.push(
      new Link(
        index,
        typeof source === 'object' ? source : feo,
        typeof target === 'object' ? target : feo,
        100
      )
    ); */
    this.links.push(new Link(1, this.nodes[1], this.nodes[0], 1000));
    //console.log(this.links);
    this.simulation?.force('link', d3.forceLink(this.links));
  }

  createSimulation(): d3.Simulation<Node, undefined> {
    return d3
      .forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
      .force('collide', d3.forceCollide(25));
  }

  createSVG() {
    return d3
      .select('.graph')
      .append('svg')
      .attr('width', 400)
      .attr('height', 600)
      .attr('viewBox', [-200, -300, 400, 600]);
  }

  createNodes(svg: d3.Selection<any, any, any, any>) {
    const nodes = svg
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('cx', (d) => d['x']!)
      .attr('cy', (d) => d['y']!)
      .attr('r', 5)
      .on('click', this.dragged);
  }

  createLinks(svg: d3.Selection<any, any, any, any>) {
    const links = svg
      .selectAll('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .data(this.links)
      .enter()
      .append('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .attr('x1', (d) => d.Source.x!)
      .attr('x2', (d) => d.Target.x!)
      .attr('y1', (d) => d.Source.y!)
      .attr('y2', (d) => d.Target.y!);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('Graph');
  }

  dragged(event: any, d: Node) {
    console.log('funciona' + d.index);
    //this.nodes.push(new Node()
  }
}
