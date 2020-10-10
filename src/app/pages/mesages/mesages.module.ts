import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesagesPageRoutingModule } from './mesages-routing.module';

import { MesagesPage } from './mesages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesagesPageRoutingModule
  ],
  declarations: [MesagesPage]
})
export class MesagesPageModule {}
