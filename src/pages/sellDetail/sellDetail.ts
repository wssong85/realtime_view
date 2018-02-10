import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-sellDetail',
  	templateUrl: 'sellDetail.html'
})

export class SellDetail {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}
	
	
	ionViewDidLoad() {
		this.init();
	}
	
	ionViewWillEnter() {
	}
	
	ionViewDidEnter() {
	}
	
	ionViewWillLeave() {
	}
	
	ionViewDidLeave() {
	}
	
	ionViewWillUnload() {
	}
	
	ionViewCanEnter() {
	}
	
	ionViewCanLeave() {
	}
  
  	init() {
  		console.log("detail");
  	}
}
