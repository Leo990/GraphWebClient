import { Link } from './link';
import { Node } from './node';

export class Graph {
  // path('all/', view=all_graphs, name='AllGraphs'),
  // path('create/', view=create_graph, name='CreateGraph'),
  // path('<str:id>/read/', view=read_graph, name='ReadGraph'),
  // path('<str:id>/edit/', view=edit_graph, name='EditGraph'),
  // path('<str:id>/delete/', view=delete_graph, name='DeleteGraph'),
  // path('create/file/', view=graph_from_file, name='GraphFromFile'),
  // path('create/random/', view=random_graph, name='RandomGraph'),
  id: string = '';
  name: string = '';
  nodes: Node[] = [];
  edges: Link[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get Nodes() {
    return this.nodes;
  }

  set Nodes(nodes: Node[]) {
    this.nodes = nodes;
  }

  get Edges() {
    return this.edges;
  }

  set Links(edges: Link[]) {
    this.edges = edges;
  }

  toObject(): any {
    let nodes: {
      index?: number;
      label?: string;
      data?: any;
      type?: any;
    }[] = [];
    let links: {
      index: number;
      source: number;
      target: number;
      weight: number;
    }[] = [];

    this.nodes.forEach((elem: Node) => {
      nodes.push({
        index: elem.index,
        label: elem.label,
        data: elem.data,
        type: elem.type,
      });
    });
    console.log(this.edges);

    this.edges.forEach((element: Link) => {
      let edge = {
        index: element.index,
        source: element.Source.index,
        target: element.Target.index,
        weight: element.weight,
      };

      links.push(edge);
    });
    return {
      id: this.id,
      name: this.name,
      nodes: nodes,
      edges: links,
    };
  }
}
