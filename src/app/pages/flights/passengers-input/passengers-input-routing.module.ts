import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassengersInputPage } from './passengers-input.page';

const routes: Routes = [
  {
    path: '',
    component: PassengersInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengersInputPageRoutingModule {}
