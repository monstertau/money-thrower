import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FwpComponent } from "./fwp.component";

const routes: Routes = [
    {
        path: "forgot-password",
        component: FwpComponent,
        data: {
            title: 'Forgot Password Page'
        },
    },
    {
        path: "forgot-password/**",
        component: FwpComponent,
        data: {
            title: 'Forgot Password Page 2'
        }
    }
    
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class FwpRountingModule { }