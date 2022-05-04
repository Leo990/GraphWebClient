import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { MainComponent } from './main/main.component';
import { GraphService } from '../services/graph.service';
import { HttpClientModule } from '@angular/common/http';
import { AdministrateComponent } from './administrate/administrate.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './main/list/list.component';
import { FileComponent } from './main/file/file.component';
import { RandomComponent } from './main/random/random.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilesDirective } from '../directives/files.directive';
import { FilesComponent } from './administrate/files/files.component';

@NgModule({
  declarations: [
    MainComponent,
    AdministrateComponent,
    ListComponent,
    RandomComponent,
    FilesDirective,
    FilesComponent,
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    HttpClientModule,
    RouterModule,
    NgxDropzoneModule,
  ],
  providers: [GraphService],
  exports: [MainComponent],
})
export class GraphsModule {}
