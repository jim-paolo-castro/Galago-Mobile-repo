import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDatesPageRoutingModule } from './select-dates-routing.module';

import { SelectDatesPage } from './select-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDatesPageRoutingModule
  ],
  declarations: [SelectDatesPage]
})
export class SelectDatesPageModule {}
