import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SellPage } from './sell';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
    	SellPage
  	],
  	imports: [
        IonicPageModule.forChild(SellPage),
        PipesModule
  	]
})

export class SellPageModule {}