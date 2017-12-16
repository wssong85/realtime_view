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
  selector: 'page-hashtag',
  templateUrl: 'hashtag.html'
})
export class Hashtag {

  //brightness: number = 20;
  saturation: number = 0;
  //warmth: number = 1300;
  //structure: any = {lower: 33, upper: 60};

  onChange(ev: any) {
    console.log('Changed', ev);
  }


	constructor(public navCtrl: NavController, public http: Http) {

  	}

}