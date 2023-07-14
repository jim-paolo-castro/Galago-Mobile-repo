import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlyingFromToPage } from './flying-from-to.page';

const routes: Routes = [
  {
    path: '',
    component: FlyingFromToPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlyingFromToPageRoutingModule {}
