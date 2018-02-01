import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Index } from '../index/index';

@Component({
    selector: 'page-filter',
  	templateUrl: 'filter.html'
})
export class Filter {

	hashtag: string = "";
	price: object = {lower: 0, upper: 10000000};
	tradeType: string = "01";
	tradeStartDate: string = this.getNow();
	tradeEndDate: string = this.getNow();

	tabIdx: number = 0;

	constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private http: HttpClient) { 

		this.tabIdx = this.navParams.get("tabIdx");
	}

	ionViewDidLoad() { }
	
	sendFilter(formValue: any) {

		// TODO: 추후 서버 단에서 세션값으로 변경 시 지울 것...
  		// 일단 임의로 넣음
		formValue.userId = "admin";
		  
		console.log("filter.ts sendFilter value => %o ", formValue);
		  
  		let headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/hastag/apitest.do", formValue, { headers: headers })
		.subscribe((res: any) => {
			
			console.log("filter.ts sendFilter results => %o ", res);

			if(res.success) {

				let products = res.products || [];

				// 일단 무조건 구매 탭으로 가게함
				this.navCtrl.setRoot(Index, { tabIdx: 1, isFilter: true, products: res.products }); 
				//this.navCtrl.setRoot(Index, { tabIdx: this.tabIdx, results: res.results })
			
			} else {
				this.showAlert(res.message);
			}
			
		}, (err) => {

			this.showAlert("failed loading json data");
		});

		// this.http.get('https://randomuser.me/api/?results=2')
		// .subscribe((res: any) => {

		// 	//this.navCtrl.setRoot(Index, { tabIdx: this.tabIdx, results: res.results })
		// 	this.navCtrl.setRoot(Index, { tabIdx: 1, results: res.results }); // 일단 무조건 구매 탭으로 가게함

		// }, (err) => {
		// 	alert("failed loading json data");
		// });
	}

	getNow() {

		let now = new Date();
		let yyyy = now.getFullYear().toString();
		let mm = (now.getMonth() + 1).toString();
		let dd = now.getDate().toString();

		return yyyy +"-"+ (mm[1] ? mm : "0"+ mm[0]) +"-"+ (dd[1] ? dd : "0"+ dd[0]);
	}

	showAlert(message: string) {

    	let alert = this.alertCtrl.create({
      		title: "알림",
      		subTitle: message,
      		buttons: ["확인"]
    	});
    	alert.present();
  	}
}

