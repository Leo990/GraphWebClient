import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Graph } from 'src/app/models/graph';
import { Link } from 'src/app/models/link';
import { Node } from 'src/app/models/node';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  @Input('graph')
  graph: Graph;

  @Output('nodeForm')
  nForm: EventEmitter<Node> = new EventEmitter<Node>();

  @Output('edgeForm')
  eForm: EventEmitter<Link> = new EventEmitter<Link>();

  nodeForm = this.fb.group({
    index: this.fb.control('', [Validators.required]),
    label: this.fb.control('', [Validators.required]),
    data: this.fb.group({}),
    type: this.fb.group({}),
  });

  edgeForm = this.fb.group({
    index: this.fb.control('', [Validators.required]),
    source: this.fb.group({
      index: this.fb.control('', [Validators.required]),
      label: this.fb.control('', [Validators.required]),
      data: this.fb.group({}),
      type: this.fb.group({}),
    }),
    target: this.fb.group({
      index: this.fb.control('', [Validators.required]),
      label: this.fb.control('', [Validators.required]),
      data: this.fb.group({}),
      type: this.fb.group({}),
    }),
    weight: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {
    this.graph = new Graph('');
  }

  ngOnInit(): void {}

  sendNodeForm() {
    typeof this.graph != 'undefined'
      ? this.nodeForm.get('index')?.setValue(this.graph.nodes.length + 1)
      : console.log('El formulario no se ha procesado correctamente');
    if (this.nodeForm.invalid) {
      console.log('=> No es valido');
      return;
    }

    let node: Node = new Node(
      this.nodeForm.get('index')?.value,
      this.nodeForm.get('label')?.value,
      this.nodeForm.get('data')?.value,
      this.nodeForm.get('type')?.value
    );
    this.nForm.emit(node);
    this.nodeForm.reset();
  }

  sendEdgeForm() {
    typeof this.graph != 'undefined'
      ? this.edgeForm.get('index')?.setValue(this.graph.edges.length + 1)
      : console.log('El formulario no se ha procesado correctamente');

    if (this.edgeForm.invalid) {
      return;
    }

    let link: Link = new Link(
      this.edgeForm.get('index')?.value,
      this.edgeForm.get('source')?.value,
      this.edgeForm.get('target')?.value,
      this.edgeForm.get('weight')?.value
    );

    this.eForm.emit(link);
    this.edgeForm.reset();
  }

  addSource(source: Node) {
    let value = {
      index: source.index,
      label: source.label,
      data: {},
      type: {},
    };
    this.edgeForm.get('source')?.setValue(value);
  }
  addTarget(target: Node): void {
    let value = {
      index: target.index,
      label: target.label,
      data: {},
      type: {},
    };
    this.edgeForm.get('target')?.setValue(value);
  }
}
