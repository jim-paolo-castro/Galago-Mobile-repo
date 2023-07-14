import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferredClassPage } from './preferred-class.page';

const routes: Routes = [
  {
    path: '',
    component: PreferredClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferredClassPageRoutingModule {}
