import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/models/graph';
import { Node } from 'src/app/models/node';
import { Link } from 'src/app/models/link';
import { interval } from 'rxjs';

@Component({
  selector: 'app-administrate',
  templateUrl: './administrate.component.html',
  styleUrls: ['./administrate.component.css'],
})
export class AdministrateComponent implements OnInit, OnDestroy {
  graph: Graph;
  simulation?: d3.Simulation<Node, undefined>;
  link?: d3.Selection<SVGLineElement, Link, any, any>;
  node?: d3.Selection<SVGCircleElement, Node, any, any>;
  nodeText?: d3.Selection<SVGTextElement, Node, any, any>;
  svg?: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  subscriptor?: Subscription;

  constructor(private graphService: GraphService) {
    let graph = JSON.parse(localStorage.getItem('Graph')!);
    this.graph = new Graph(graph.name);
    this.graph.id = graph._id.$oid != null ? graph._id.$oid : '';
  }

  ngOnInit(): void {
    let graph = JSON.parse(localStorage.getItem('Graph')!);
    this.graph.nodes = graph.nodes;
    this.initLinks(graph);
    this.simulation = this.createSimulation();
    this.svg = this.createSVG();
    this.link = this.createLinks();
    this.node = this.createNodes();
    this.nodeText = this.createNodeText();
    this.subscriptor = interval(5).subscribe(() => {
      this.ticked();
    });
  }

  initLinks(graph: any): void {
    var source: Node;
    var target: Node;
    const feo = new Node(1, '', {}, {});
    graph.edges.forEach((element: any) => {
      this.graph.nodes.forEach((item: Node) => {
        if (element.source == item.index) {
          source = item;
        }
        if (element.target == item.index) {
          target = item;
        }
      });
      this.graph.edges.push(
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
      .forceSimulation(this.graph.Nodes)
      .force('link', d3.forceLink(this.graph.Links))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())
      .force('collide', d3.forceCollide(20));
  }

  createSVG() {
    return d3
      .select('.graph')
      .append('svg')
      .attr('class', 'w-100')
      .attr('width', 600)
      .attr('height', 400)
      .attr('viewBox', [-200, -200, 600, 400]);
  }

  createNodes(): d3.Selection<SVGCircleElement, Node, any, any> {
    return this.svg!.selectAll('circle')
      .data(this.graph.Nodes)
      .enter()
      .append('circle')
      .attr('cx', (d: Node) => d['x']!)
      .attr('cy', (d: Node) => d['y']!)
      .attr('r', 10)
      .attr('fill', 'gray');
  }

  createNodeText(): d3.Selection<SVGTextElement, Node, any, any> {
    return this.svg!.selectAll('text')
      .data(this.graph.nodes)
      .enter()
      .append('text')
      .attr('x', (d: Node) => d['x']!)
      .attr('y', (d: Node) => d['y']!)
      .text((d: Node) => d['index']!);
  }

  createLinks(): d3.Selection<SVGLineElement, Link, any, any> {
    return this.svg!.selectAll('line')
      .style('stroke', 'red')
      .style('stroke-width', 2)
      .data(this.graph.edges)
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

  ticked() {
    typeof this.link !== 'undefined'
      ? this.link!.attr('x1', (d: Link) => d.Source.x!)
          .attr('x2', (d: Link) => d.Target.x!)
          .attr('y1', (d: Link) => d.Source.y!)
          .attr('y2', (d: Link) => d.Target.y!)
      : console.log('alv todo');

    typeof this.node !== 'undefined'
      ? this.node!.attr('cx', (d: Node) => d['x']!).attr('cy', (d) => d['y']!)
      : console.log('X2');

    typeof this.nodeText !== 'undefined'
      ? this.nodeText!.attr('x', (d: Node) => d['x']!).attr('y', (d) => d['y']!)
      : console.log('X2');
  }

  addNode(node: Node) {
    this.simulation?.stop();
    node != null || node != undefined
      ? this.graph.nodes.push(node)
      : console.log('No se ha añadido el nodo');
    this.simulation?.nodes(this.graph.nodes);

    this.simulation?.restart();
    this.subscriptor?.unsubscribe();
  }

  addEdge(edge: Link) {
    this.simulation?.stop();
    edge != null || edge != undefined
      ? this.graph.edges.push(edge)
      : console.log('No se ha añadido el nodo');

    this.simulation?.restart();
    this.subscriptor?.unsubscribe();
  }
}
