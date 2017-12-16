import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { Index } from '../pages/index/index';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;
	
	//rootPage:any = Index;
  	rootPage:any = Login;
  
  	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    	platform.ready().then(() => {
      		// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.
      		statusBar.styleDefault();
      		splashScreen.hide();
    	});
	}
	
	openPage() {
		this.nav.push(Home);
	}
}


