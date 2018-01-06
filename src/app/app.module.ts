import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';

import { IndexModule } from '../pages/index/index.module';
import { BuyModule } from '../pages/buy/buy.module';
import { HashtagModule } from '../pages/hashtag/hashtag.module';
import { MapModule } from '../pages/map/map.module';
import { SellModule } from '../pages/sell/sell.module';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Home
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    BuyModule,
    HashtagModule,
    IndexModule,
    MapModule,
    SellModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Home
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
