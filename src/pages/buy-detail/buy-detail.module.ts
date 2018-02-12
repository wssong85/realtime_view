import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BuyDetailPage } from './buy-detail';

@NgModule({
    declarations: [
        BuyDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(BuyDetailPage),
    ]
})
export class BuyDetailPageModule {}
