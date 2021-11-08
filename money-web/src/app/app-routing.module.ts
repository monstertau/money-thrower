import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FwpComponent } from './fwp/fwp.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletAddComponent} from "./wallet/wallet-add/wallet-add.component";
import { ChangePassComponent } from './authentication/change-pass/change-pass.component';
import { ChangePassGuard } from './guards/change-pass.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'forgot-password',component:FwpComponent},
  // { path: 'forgot-password/:**',component:FwpComponent},
  { path: 'change-password',component:ChangePassComponent},
  {
    path: 'my-wallets', component: WalletComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
    },
  {
    path: 'add_wallet', component: WalletAddComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
