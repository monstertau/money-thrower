import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './services/error.interceptor';
import { InterceptorService } from './services/interceptor.service';
import { HomeModule } from './home/home.module';
import { FwpModule } from './fwp/fwp.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionAddModule } from "./transaction-add/transaction-add.module";
import { NzIconModule } from "ng-zorro-antd/icon";
import { CategoryModule } from './category/category.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    FwpModule,
    HomeModule,
    CategoryModule,
    WalletModule,
    FormsModule,
    HttpClientModule,
    TransactionAddModule,
    BrowserAnimationsModule,
    NzIconModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
