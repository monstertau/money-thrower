import {NgModule} from '@angular/core';
import {InputNavigationComponent} from "./input-navigation.component";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [
        InputNavigationComponent,
    ],
    exports: [
        InputNavigationComponent
    ],

    imports: [
        NzGridModule,
        NzIconModule,
        CommonModule
    ]
})
export class InputNavigationModule {
}
