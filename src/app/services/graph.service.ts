import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private apiBase: string = 'http://127.0.0.1:8000/api/graphs';

  //Se pasa por parametro en el constructor el HttpClient para operar la API
  constructor(private http: HttpClient) {}

  getAllGraph() {
    return this.http.get(`${this.apiBase}/all/`);
  }

  getRandomGraph() {
    return this.http.get(`${this.apiBase}/create/random/`);
  }
}
