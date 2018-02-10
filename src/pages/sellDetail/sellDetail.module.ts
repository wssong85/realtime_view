import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SellDetail } from './sellDetail';

@NgModule({
	declarations: [
    	SellDetail,
  	],
  	imports: [
    	IonicPageModule.forChild(SellDetail),
  	],
  	entryComponents: [
    	SellDetail,
  	]
})

export class SellDetailModule {}