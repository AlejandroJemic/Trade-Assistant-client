import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesagesPage } from './mesages.page';

const routes: Routes = [
  {
    path: '',
    component: MesagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesagesPageRoutingModule {}
