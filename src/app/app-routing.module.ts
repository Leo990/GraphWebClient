import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsRoutingModule } from './graphs/graphs-routing.module';
import { MainComponent } from './graphs/main/main.component';

const routes: Routes = [
  {
    path: 'graphs',
    loadChildren: () =>
      import('src/app/graphs/graphs.module').then((m) => GraphsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
