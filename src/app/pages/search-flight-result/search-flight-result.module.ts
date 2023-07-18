import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFlightResultPageRoutingModule } from './search-flight-result-routing.module';

import { SearchFlightResultPage } from './search-flight-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFlightResultPageRoutingModule
  ],
  declarations: [SearchFlightResultPage]
})
export class SearchFlightResultPageModule {}
