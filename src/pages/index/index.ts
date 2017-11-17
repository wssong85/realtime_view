import { Component, ViewChild } from '@angular/core';

import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';
import { Home } from '../home/home';

@Component({
  templateUrl: 'index.html',
})
export class Index {

	tab1Root = Buy;
	tab2Root = Sell;
	tab3Root = Home;
	
	constructor() {}
}
