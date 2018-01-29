import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Map } from '../map/map';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';

import { Zone } from '../zone/zone';
import { Filter } from '../filter/filter';

@Component({
  templateUrl: 'index.html',
})
export class Index {

	tab1Root = Map;
	tab2Root = Buy;
	tab3Root = Sell;
	
	constructor(private navCtrl: NavController) {}

	pushMap(v) {
		//this.navCtrl.setRoot(Zone);	
		console.log('1');
		this.navCtrl.push(Zone);
	}
	
	pushSettings(v) {
		console.log('2');
		this.navCtrl.push(Filter);
	}
}
