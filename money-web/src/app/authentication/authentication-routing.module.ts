import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "../guards/login.guard";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        data: {
            title: 'Login Page'
        },
        canActivate: [LoginGuard]
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AuthenticationRoutingModule { }