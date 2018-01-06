import { Component } from '@angular/core';

import { Map } from '../map/map';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';

@Component({
  templateUrl: 'index.html',
})
export class Index {

	tab1Root = Map;
	tab2Root = Buy;
	tab3Root = Sell;
	
	constructor() {}
}
