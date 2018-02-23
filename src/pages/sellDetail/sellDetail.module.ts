import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SellDetailPage } from './sellDetail';

@NgModule({
	declarations: [
    	SellDetailPage,
  	],
  	imports: [
    	IonicPageModule.forChild(SellDetailPage),
  	]
})

export class SellDetailPageModule {}