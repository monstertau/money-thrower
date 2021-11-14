import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FwpComponent } from './fwp/fwp.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletAddComponent } from "./wallet/wallet-add/wallet-add.component";
import { ChangePassComponent } from './authentication/change-pass/change-pass.component';
import { LoginComponent } from './authentication/login/login.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        component: TransactionComponent,
        canLoad: [AuthGuard],
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
      }
    ],
  },
  { path: 'forgot-password', component: FwpComponent },
  // { path: 'forgot-password/:**',component:FwpComponent},
  { path: 'change-password', component: ChangePassComponent },
  {
    path: 'my-wallets', component: WalletComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
  },
  {
    path: 'add-wallet', component: WalletAddComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
