import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-sellDetail',
  	templateUrl: 'sellDetail.html'
})
export class SellDetailPage {

    product:object = {};

    productPrint: string = ""; // 테스트 변수 추후 지울 것...

	constructor(public navCtrl: NavController, public navParams: NavParams) {

        const params = this.navParams.data;
		if (params) {
            this.product = params.product;
            this.productPrint = JSON.stringify(this.product);
		}
    }
	
	
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
      
    goBack() {
        this.navCtrl.pop();
    }
}
