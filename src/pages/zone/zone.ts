import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

import { IndexPage } from '../index/index';

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html'
})
export class Zone {

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {

  	}

	placeSelect= 1;
	
  	trailNames: any;
  	placeNames: any;
  	
  	loadMap(x, y) {
  		this.navCtrl.setRoot(IndexPage, { tabIdx: 1, zone : {"x":x, "y":y} });
  	}

	loadPlace(formValue: any) {
		
		//formValue["placeSelect"] = this.placeSelect;
		//console.log(this.placeSelect);
		
		//console.log(formValue);
		
		if(this.placeSelect == 1) {
		
			var headers = new Headers();
	        headers.append("Content-Type", "application/json; charset=UTF-8");
		
			this.http.post('http://localhost/shopping/zone/apiSelectTbTrail.do', formValue, { headers: headers })
			
			.map(res => res.json())
			
			.subscribe(res => {
				//console.log(res);
				console.log(res.result);
				this.trailNames = res.result;
				
			}, (err) => {
				alert("failed loading json data");
			});
		
		} else {
		
			var headers = new Headers();
	        headers.append("Content-Type", "application/json; charset=UTF-8");
		
			this.http.post('http://localhost/shopping/zone/apiSelectNaverPlace.do', formValue, { headers: headers })
			
			.map(res => res.json())
			
			.subscribe(res => {
				//console.log(res.success);
				//console.log(res.result);
				
				//console.log(vRetJson);
				
				//console.log(vRetJson.result.items);
				
				//res.result.result.item
				
				if(res.success) {
					
					var vRetJson = JSON.parse(res.result);	
					
					if(vRetJson.result) {
						//console.log(vRetJson.result.items);
						this.trailNames = vRetJson.result.items;
						
					} else {
					
						alert("검색 결과가 없습니다.");
						
					}
					
				} else {
					alert("검색 결과가 없습니다.");
				}
				
			}, (err) => {
			
				alert("failed loading json data");
				
			});
			
			
		}
		
	}

	
}
