import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-detail',
  	templateUrl: 'detail.html'
})

export class Detail {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
