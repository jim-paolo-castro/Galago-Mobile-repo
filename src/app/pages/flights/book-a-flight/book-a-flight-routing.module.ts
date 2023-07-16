import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookAFlightPage } from './book-a-flight.page';

const routes: Routes = [
  {
    path: '',
    component: BookAFlightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAFlightPageRoutingModule {}
