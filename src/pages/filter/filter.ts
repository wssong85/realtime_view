import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AlertProvider } from '../../providers/alert/alert'
import { IndexPage } from '../index/index';

@IonicPage()
@Component({
    selector: 'page-filter',
  	templateUrl: 'filter.html'
})
export class FilterPage {

	hashtag: string = "";
	price: object = {lower: 0, upper: 10000000};
	tradeType: string = "00";
	tradeStartDate: string = this.getNow();
	tradeEndDate: string = this.getNow(1);

	tabIdx: number = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alert: AlertProvider) { 

		this.tabIdx = this.navParams.get("tabIdx");
	}

	ionViewDidLoad() { }
	
	// TODO: 최소값, 최대값 입력 처리, 드래그 조정은 일정간격으로
	// TODO: 유효성 검사 체크
	sendFilter(formValue: any) {

		// TODO: 추후 서버 단에서 세션값으로 변경 시 지울 것...
  		// 일단 임의로 넣음
		formValue.userId = "admin";
		  
		console.log("filter.ts sendFilter value => %o ", formValue);
		  
		const headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/hastag/apiSelectBuyProduct.do", formValue, { headers: headers })
		.subscribe((res: any) => {
			
			console.log("filter.ts sendFilter results => %o ", res);

			if(res.success) {

				// 일단 무조건 구매 탭으로 가게함
				this.navCtrl.setRoot(IndexPage, { tabIdx: 1, filters: formValue, products: res.products }); 
				//this.navCtrl.setRoot(Index, { tabIdx: this.tabIdx, results: res.results })
			
			} else {
				this.alert.showWithMessage(res.message);
			}
			
		}, (err) => {

			this.alert.showWithMessage("failed loading json data");
		});
	}

	getNow(addMonth: number = 0) {

		const now = new Date();

		if (addMonth != 0) {

			now.setMonth(now.getMonth() + addMonth);
		}

		const yyyy = now.getFullYear().toString();
		const mm = (now.getMonth() + 1).toString();
		const dd = now.getDate().toString();

		return yyyy +"-"+ (mm[1] ? mm : "0"+ mm[0]) +"-"+ (dd[1] ? dd : "0"+ dd[0]);
	}
}

