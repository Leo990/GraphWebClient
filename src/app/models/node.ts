import * as d3 from 'd3';

export class Node implements d3.SimulationNodeDatum {
  index?: number | undefined;
  label?: string;
  data: any = {};
  type: any = {};
  x?: number | undefined;
  y?: number | undefined;

  constructor(index: number, label: string, data: any, type: any) {
    this.index = index;
    this.label = label;
    this.data = data;
    this.type = type;
    this.x = 0;
    this.y = 0;
  }

  to_json() {
    let node = {
      index: this.index,
      label: this.label,
      data: this.data,
      type: this.type,
    };
    return JSON.stringify(node);
  }
}
