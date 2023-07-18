import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFlightResultPage } from './search-flight-result.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFlightResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFlightResultPageRoutingModule {}
