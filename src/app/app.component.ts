import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';
import { HashtagPage } from '../pages/hashtag/hashtag';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;
	
    //rootPage:any = IndexPage;
    rootPage:any = Login;

    userName:string = "";

  	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
    	platform.ready().then(() => {
      		// Okay, so the platform is ready and our plugins are available.
      		// Here you can do any higher level native things you might need.
      		statusBar.styleDefault();
            splashScreen.hide();

            // 로그인 이벤트 등록
            events.subscribe("user:login", (userName: string) => {
                this.userName = userName
            });
        });
	}
	
	openPage() {
		this.nav.push(HashtagPage);
	}
}