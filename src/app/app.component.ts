import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Index } from '../pages/index/index';
import { Login } from '../pages/login/login';
import { Hashtag } from '../pages/hashtag/hashtag';
import { Detail } from '../pages/detail/detail';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;
	
<<<<<<< HEAD
	//rootPage:any = Index;
  	rootPage:any = Detail;
=======
	rootPage:any = Index;
  	//rootPage:any = Hashtag;
>>>>>>> branch 'master' of https://github.com/wssong85/realtime_view
  
  	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    	platform.ready().then(() => {
      		// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.
      		statusBar.styleDefault();
      		splashScreen.hide();
    	});
	}
	
	openPage() {
		this.nav.push(Hashtag);
	}
	
}


