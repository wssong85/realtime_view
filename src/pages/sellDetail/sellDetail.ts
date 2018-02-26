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
	
	//맨처음페이지들어올때
	ionViewDidLoad() {
		this.init();
	}
	
	//페이지들어올때마다
	ionViewWillEnter() {
	}
	
	ionViewDidEnter() {
	}
	
	//페이지벗어날때마다
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
