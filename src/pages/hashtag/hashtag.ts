import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, MenuController, AlertController } from 'ionic-angular';

@Component({
	selector: 'page-hashtag',
  	templateUrl: 'hashtag.html'
})
export class Hashtag {

	hashtag: string = "";
	tradeType: string = "01";
  	price: any = {lower: 0, upper: 10000000};
  
	constructor(public navCtrl: NavController, public menuCtrl: MenuController, public alertCtrl: AlertController, public http: Http) {
	
		this.menuCtrl.swipeEnable(false);
		
		console.log("1");
  	}
  	
  	ionViewDidLoad() {
  	
  		console.log("2");
  	
   		this.getHashtag();
   	
   		console.log("3");	
  	}
  	
  	getHashtag() {
  	
  		// TODO: 추후 서버 단에서 세션값으로 변경 시 지울 것...
  		// 일단 임의로 넣음
  		let userId = "admin";
  	
  		let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
		this.http.post("http://localhost/shopping/hastag/apiSelectTbIfHashtagInterest.do", { userId: userId }, { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
			
			if(res.success) {
				
				let interest = res.interest;
				
				console.log(interest);
				
				if (interest) {
			
					this.hashtag = interest.HASHTAG;
					this.tradeType = interest.TRADE_SE;
  					this.price = {lower: interest.MIN_COST, upper: interest.MAX_COST};
				}
			
			} else {
			
				this.showAlert(res.message);
			}
			
		}, (err) => {
			this.showAlert("failed loading json data");
		});
  	}

	// TODO: 최소값, 최대값 입력 처리, 드래그 조정은 일정간격으로
	// TODO: 유효성 검사 체크
  	sendHashtag(formValue: any) {
  	
  		// TODO: 추후 서버 단에서 세션값으로 변경 시 지울 것...
  		// 일단 임의로 넣음
  		formValue.userId = "admin";
  	
  		console.log(formValue);
  		
  		let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
		this.http.post("http://localhost/shopping/hastag/apiInsertTbIfHashtagInterest.do", formValue, { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
			
			if(res.success) {
			
				console.log("==>" + res.result);
				console.log(res.result);
			
				this.showAlert("관심목록을 등록했습니다.");
			
			} else {
				this.showAlert(res.message);
			}
			
		}, (err) => {
			this.showAlert("failed loading json data");
		});
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