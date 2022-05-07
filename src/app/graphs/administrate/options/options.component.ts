import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Graph } from 'src/app/models/graph';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  @Input('graph')
  graph: Graph;

  @Output('nodeForm')
  nForm: EventEmitter<any> = new EventEmitter<any>();

  @Output('edgeForm')
  eForm: EventEmitter<any> = new EventEmitter<any>();

  nodeForm = this.fb.group({
    index: this.fb.control(''),
    label: this.fb.control(''),
    data: this.fb.group({}),
    type: this.fb.group({}),
  });

  edgeForm = this.fb.group({
    index: this.fb.control(''),
    source: this.fb.group({
      index: this.fb.control(''),
      label: this.fb.control(''),
      data: this.fb.group({}),
      type: this.fb.group({}),
    }),
    target: this.fb.group({
      index: this.fb.control(''),
      label: this.fb.control(''),
      data: this.fb.group({}),
      type: this.fb.group({}),
    }),
    weight: this.fb.control(''),
  });

  constructor(private fb: FormBuilder) {
    this.graph = new Graph('');
  }

  ngOnInit(): void {}

  sendNodeForm() {
    typeof this.graph != 'undefined'
      ? this.nodeForm.get('index')?.setValue(this.graph.nodes.length + 1)
      : console.log('El formulario no se ha procesado correctamente');

    this.nForm.emit(this.nodeForm.value);
    this.nodeForm.reset();
  }

  sendEdgeForm() {
    typeof this.graph != 'undefined'
      ? this.edgeForm.get('index')?.setValue(this.graph.edges.length + 1)
      : console.log('El formulario no se ha procesado correctamente');

    this.eForm.emit(this.edgeForm.value);
    this.edgeForm.reset();
  }

  addSource(source: any) {
    let value = {
      index: source.index,
      label: source.label,
      data: {},
      type: {},
    };
    this.edgeForm.get('source')?.setValue(value);
  }
  addTarget(target: any) {
    let value = {
      index: target.index,
      label: target.label,
      data: {},
      type: {},
    };
    this.edgeForm.get('target')?.setValue(value);
  }
}
