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

  to_json() {
    let nodes = [];
    let links = [];
    this.nodes.forEach((elem) => {
      nodes.push(elem.to_json());
    });
    this.edges.forEach((elem) => {
      links.push(elem.to_json());
    });

    return JSON.stringify({
      name: this.name,
      nodes: this.nodes,
      edges: this.edges,
    });
  }
}
