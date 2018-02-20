import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BuyPage } from './buy';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
    	BuyPage
  	],
  	imports: [
		IonicPageModule.forChild(BuyPage),
		PipesModule
  	]
})
export class BuyPageModule {}