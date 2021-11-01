import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { WalletComponent } from './wallet.component';
import  {WalletAddComponent} from "./wallet-add/wallet-add.component";

const routes: Routes = [
  {
    path: 'my-wallets',
    component: WalletComponent,
    data: {
      title: 'My wallets'
    },
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
