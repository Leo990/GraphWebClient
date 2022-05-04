import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private apiBase: string = 'http://127.0.0.1:8000/api/graphs';

  observable: Observable<number> = interval(5);

  constructor(private http: HttpClient) {}

  getAllGraph() {
    return this.http.get(`${this.apiBase}/all/`);
  }

  getRandomGraph() {
    return this.http.get(`${this.apiBase}/create/random/`);
  }

  createGraph(graph: string) {
    return this.http.post(`${this.apiBase}/create/`, graph);
  }

  get Observable() {
    return this.observable;
  }
}
