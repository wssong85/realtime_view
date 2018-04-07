import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';
import { HashtagPage } from '../pages/hashtag/hashtag';
import { MapSearchPage } from '../pages/map-search/map-search';

import { GUserProvider } from '../providers/g-user/g-user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;
	
  	//rootPage:any = Detail;
    //rootPage:any = IndexPage;
    rootPage:any = Login;
    //rootPage:any = MapSearchPage;

  	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public gUser: GUserProvider) {
    	platform.ready().then(() => {
      		// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.
      		statusBar.styleDefault();
            splashScreen.hide();
    	});
	}
	
	openPage() {
		this.nav.push(HashtagPage);
	}
}