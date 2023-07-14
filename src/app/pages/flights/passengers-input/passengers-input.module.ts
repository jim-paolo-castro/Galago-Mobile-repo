import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengersInputPageRoutingModule } from './passengers-input-routing.module';

import { PassengersInputPage } from './passengers-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassengersInputPageRoutingModule
  ],
  declarations: [PassengersInputPage]
})
export class PassengersInputPageModule {}
