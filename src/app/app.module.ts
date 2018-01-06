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
import { Hashtag } from '../pages/hashtag/hashtag';

import { IndexModule } from '../pages/index/index.module';
import { MapModule } from '../pages/map/map.module';
import { BuyModule } from '../pages/buy/buy.module';
import { SellModule } from '../pages/sell/sell.module';
import { DetailModule } from '../pages/detail/detail.module';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Home,
    Hashtag,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IndexModule,
    MapModule,
    BuyModule,
    SellModule,
    DetailModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Home,
    Hashtag,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
