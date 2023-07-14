import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDatesPage } from './select-dates.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDatesPageRoutingModule {}
