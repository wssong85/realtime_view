import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
	constructor(public navCtrl: NavController, public http: Http) {

  	}
  	
  	users: any;
  	result: any;
	
	loadjson() {
	
		this.http.get('https://randomuser.me/api/?results=10')
		
		.map(res => res.json())
		
		.subscribe(res => {
			this.users = res.results;
		}, (err) => {
			alert("failed loading json data");
		});
	
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
  	
  	loadjson3(formValue: any) {
	
		var headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
		this.http.post('http://localhost/com/user/test.do', { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
			this.result = res;	
		}, (err) => {
			alert("failed loading json data");
		});
	}
}
