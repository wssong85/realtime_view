import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-filter',
  	templateUrl: 'filter.html'
})
export class Filter {

	hashtag: string = "";
	price: any = {lower: 0, upper: 10000000};
	tradeType: string = "01";
	tradeStartDate: string = this.getNow();
	tradeEndDate: string = this.getNow();

	constructor(private navCtrl: NavController, private alertCtrl: AlertController, private http: HttpClient) { }

	ionViewDidLoad() { }
	 
	sendFilter(formValue: any) {

		// TODO: 추후 서버 단에서 세션값으로 변경 시 지울 것...
  		// 일단 임의로 넣음
		formValue.userId = "admin";
		  
		console.log(formValue);
  		
  		let headers = new HttpHeaders();
		headers.append("Content-Type", "application/json; charset=UTF-8");
		
		this.http.post("http://localhost/shopping/hastag/apitest.do", formValue, { headers: headers })
		
		.subscribe((res: any) => {
			
			if(res.success) {
			
				console.log("==>" + res.result);
				console.log(res.result);
			
			} else {
				this.showAlert(res.message);
			}
			
		}, (err) => {
			this.showAlert("failed loading json data");
		});
	 }

	getNow() {
		let now = new Date();
		let yyyy = now.getFullYear().toString();
		let mm = (now.getMonth() + 1).toString();
		let dd = now.getDate().toString();

		return yyyy +"-"+ (mm[1] ? mm : "0"+ mm[0]) +"-"+ (dd[1] ? dd : "0"+ dd[0]);
	 }

	 showAlert(message: any) {
    	let alert = this.alertCtrl.create({
      		title: "알림",
      		subTitle: message,
      		buttons: ["확인"]
    	});
    	alert.present();
  	}
}

