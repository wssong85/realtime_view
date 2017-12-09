import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { Index } from '../index/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
	constructor(public navCtrl: NavController, public http: Http) {

  	}
  	
  	//users: any;
  	result: any;
  	//userName: any;
  	//password: any;
	//public userName: string;
	
	user = {
	
	}

	btnLogin(v, v2) {
	
//	console.log('1');
	//console.log(v);
	//console.log(v2);
//	console.log(this.user.username);
//	console.log(this.user.password);

		if(v == "1") {
			console.log(v2);
			this.loadjson2(v2);
		}
		
	}
	 	
	public loadjson2(formValue: any) {
	
		var headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
  		console.log("formValue =>");
  		console.log(formValue);      
		
		this.http.post('http://localhost/shopping/user/apiSelectTbUserCountForCheck.do', formValue, { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
		
			if(res.success) {
			
				console.log("==>" + res.result);
				console.log(res.result);
			
				if(res.result) {
					this.navCtrl.push(Index);
				} else {
					alert("로그인정보를 입력해 주십시오.");
				}
			
			} else {
				alert(res.message);
			}
			
		}, (err) => {
			alert("failed loading json data");
		});
	
	}
	
}