import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs, Tab } from 'ionic-angular';

import { Map } from '../map/map';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';

import { Zone } from '../zone/zone';
import { Filter } from '../filter/filter';

@Component({
  templateUrl: 'index.html',
})
export class Index {

	@ViewChild("tabs") tabRef: Tabs;

	tab1Root = Map;
	tab2Root = Buy;
	tab3Root = Sell;

	currentIdx: number = 0;
	isFilter: boolean = false;
	products: any[] = [];

	tabRootParams:object = {};
	
	constructor(private navCtrl: NavController, private navParams: NavParams) {

		// navParams 처리
		let tabIdx = this.navParams.get("tabIdx");
		let isFilter = this.navParams.get("isFilter");
		let products = this.navParams.get("products");
		
		// tabIdx 값이 숫자이고 0 이상 
		if (!isNaN(tabIdx) && tabIdx >= 0) {
			// 화면에 보여질 탭 설정
			this.currentIdx = tabIdx;
		}
		
		this.isFilter = isFilter || false;	// 필터를 통해서 왔는지 여부
		this.products = products || []; 		// 필터 검색 결과

		// 탭으로 보낼 데이터 설정
		this.tabRootParams = {
			isFilter: this.isFilter,
			products: this.products
		}
	 }

	ionViewDidLoad() { 

		 // tab 갯수보다 작다면
		if (this.currentIdx < this.tabRef.length()) {

			// tab 변경
			this.tabRef.select(this.currentIdx);
		}
	}

	pushMap(v) {
		this.navCtrl.push(Zone);
	}
	
	pushSettings(v) {
		this.navCtrl.push(Filter, { tabIdx: this.currentIdx });
	}

	tabSelected(tab: Tab) {
		this.currentIdx = tab.index;
	}
}
