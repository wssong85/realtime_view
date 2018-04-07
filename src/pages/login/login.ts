import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import { AlertProvider } from '../../providers/alert/alert';
import { GUserProvider } from '../../providers/g-user/g-user';

import { IndexPage } from '../index/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
    
    constructor(public navCtrl: NavController, public alert: AlertProvider, public gUser: GUserProvider, public http: Http) {

  	}
      
    username: string = "";
    password: string = "";
      
    result: any;
      
	btnLogin(v, v2) {
		if(v == "1") {
			this.loadjson2(v2);
		}
	}
	 	
	loadjson2(formValue: any) {
	
		var headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        
  		console.log("formValue =>", formValue);
		
		this.http.post('http://localhost/shopping/user/apiSelectTbUserCountForCheck.do', formValue, { headers: headers })
		
		.map(res => res.json())
		
		.subscribe(res => {
		
			if(res.success) {
			
                console.log("==>", res);
                			
				if(res.result) {

                    // 사용자 정보 저장
                    this.gUser.set(res.user)

                    this.navCtrl.setRoot(IndexPage);
                    
				} else {
                    this.alert.showWithMessage("로그인정보를 입력해 주십시오.");
				}
			
			} else {
                this.alert.showWithMessage(res.message);
			}
			
		}, (err) => {
            this.alert.showWithMessage("failed loading json data");
		});
	
	}
}