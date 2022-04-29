import * as d3 from 'd3';
import { Node } from './node';

export class Link implements d3.SimulationLinkDatum<Node> {
  index?: number | undefined;
  source: Node | number;
  target: Node | number;
  weight?: number;

  constructor(
    index: number,
    source: Node | number,
    target: Node | number,
    weight: number
  ) {
    this.index = index;
    this.source = source;
    this.target = target;
    this.weight = weight;
  }

  get Source(): Node {
    return typeof this.source !== 'number'
      ? this.source
      : new Node(this.source, `${this.source}`, {}, {}, 0, 0);
  }

  get Target(): Node {
    return typeof this.target !== 'number'
      ? this.target
      : new Node(this.target, `${this.target}`, {}, {}, 0, 0);
  }

  set Source(source: Node) {
    this.source = source;
  }

  set Target(target: Node) {
    this.target = target;
  }
}
