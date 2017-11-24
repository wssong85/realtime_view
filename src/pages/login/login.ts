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
	console.log(v);
	console.log(v2);
//	console.log(this.user.username);
//	console.log(this.user.password);
		
		this.navCtrl.push(Index);
	}
	 	
	loadjson2(formValue: any) {
	
		var headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
	
		this.http.post('http://localhost/com/user/test.do', [formValue], { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
			this.result = res.success;
		}, (err) => {
			alert("failed loading json data");
		});
	
	}
	
}