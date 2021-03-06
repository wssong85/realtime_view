import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { UserAgent } from '@ionic-native/user-agent';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';

import { Login } from '../pages/login/login';
import { Zone } from '../pages/zone/zone';

import { IndexPageModule } from '../pages/index/index.module';
import { BuyPageModule } from '../pages/buy/buy.module';
import { BuyDetailPageModule } from '../pages/buy-detail/buy-detail.module';
import { HashtagPageModule } from '../pages/hashtag/hashtag.module';
import { MapPageModule } from '../pages/map/map.module';
import { MapSearchPageModule } from '../pages/map-search/map-search.module';
import { SellPageModule } from '../pages/sell/sell.module';
import { SellDetailPageModule } from '../pages/sellDetail/sellDetail.module';
import { SellRegistPageModule } from '../pages/sellRegist/sellRegist.module';
import { FilterPageModule } from '../pages/filter/filter.module';

import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { BuyProvider } from '../providers/buy/buy';
import { GUserProvider } from '../providers/g-user/g-user';
import { gAjaxProvider } from '../providers/comm/gAjaxProvider';

@NgModule({
  declarations: [
	MyApp,
    Login,
    Zone,
    Home
  ],
  imports: [
	BrowserModule,
	HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IndexPageModule,
    BuyPageModule,
    BuyDetailPageModule,
    HashtagPageModule,
    MapPageModule,
    MapSearchPageModule,
    SellPageModule,
    SellDetailPageModule,
    SellRegistPageModule,
    FilterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
	MyApp,
    Login,
    Zone,
    Home
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GUserProvider,
    AlertProvider,
    LoadingProvider,
    BuyProvider,
    File,
    FileTransfer,
    FileTransferObject,
	Camera,
	UserAgent,
    GUserProvider,
    gAjaxProvider
  ]
})
export class AppModule {}
