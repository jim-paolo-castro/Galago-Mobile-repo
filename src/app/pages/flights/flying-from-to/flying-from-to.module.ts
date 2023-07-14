import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlyingFromToPageRoutingModule } from './flying-from-to-routing.module';

import { FlyingFromToPage } from './flying-from-to.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlyingFromToPageRoutingModule
  ],
  declarations: [FlyingFromToPage]
})
export class FlyingFromToPageModule {}
