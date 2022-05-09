import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private apiBase: string = 'http://127.0.0.1:8000/api/graphs';

  constructor(private http: HttpClient) {}

  getAllGraph() {
    return this.http.get(`${this.apiBase}/all/`);
  }

  getRandomGraph() {
    return this.http.get(`${this.apiBase}/create/random/`);
  }

  createGraph(graph: any) {
    let id = graph.id;
    let auxGraph = {
      name: graph.name,
      nodes: graph.nodes,
      edges: graph.edges,
    };

    return id != ''
      ? this.http.put(`${this.apiBase}/${id}/edit/`, JSON.stringify(auxGraph))
      : this.http.post(`${this.apiBase}/create/`, JSON.stringify(auxGraph));
  }
}
