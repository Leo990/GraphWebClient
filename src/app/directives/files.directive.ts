import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Graph } from 'src/app/models/graph';

@Directive({
  selector: '[files]',
})
export class FilesDirective {
  @Input('graph')
  graph!: Graph;
  elementRef: ElementRef<HTMLElement>;

  constructor(
    private elem: ElementRef<HTMLElement>,
    private graphservice: GraphService
  ) {
    this.elementRef = this.elem;
  }

  @HostListener('click')
  options() {
    let opt = this.elementRef.nativeElement.id;
    switch (opt) {
      case 'files-save':
        let graphObject = this.graph.toObject();
        this.graphservice.createGraph(graphObject).subscribe((res) => {
          console.log(res);
        });
        break;
      case 'files-save-as':
        console.log('Como desea que se guarde');
        break;
      case 'files-import':
        console.log('Como desea que se guarde');
        break;
      case 'files-export':
        console.log('Como desea que se guarde');
        break;
      case 'files-print':
        console.log('Como desea que se guarde');
        break;
      case 'files-exit':
        console.log('Como desea que se guarde');
        break;
      default:
        break;
    }
  }
}
