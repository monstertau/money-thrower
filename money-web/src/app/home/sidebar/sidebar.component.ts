import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from 'src/app/services/common.service';
import {AuthService} from 'src/app/services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() collapse = new EventEmitter<boolean>();

    LogoutLoading: boolean = false;

    showLogoutModal: boolean = false;

    constructor(private commonService: CommonService, private authService: AuthService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.collapse.emit(false);
    }

    isCollapsed = false;

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
        this.collapse.emit(this.isCollapsed);
    }

    selectPage() {
        this.commonService.reloadComponent();
    }

    showLogoutDialogModal() {
        this.showLogoutModal = true;
    }

    handleCancelLogout() {
        this.showLogoutModal = false;
    }

    handleLogout() {
        this.LogoutLoading = true;
        this.logout()
            .then(() => {
                setTimeout(() => {
                    // reset
                    this.LogoutLoading = false;
                    this.showLogoutModal = false;
                    localStorage.removeItem('currentUser');
                    window.location.href = 'login';
                }, 1000)
            })
            .catch(error => {
                this.LogoutLoading = false;
                this.showErrorMessage(error.toString())
            })
    }

    async logout() {
        let error = null;
        this.authService.logout('').subscribe(
            result => {
                console.log(result);
            },
            err => {
                console.log(err);
                error = new Error("Something wrong. please")
            }
        )
        if (error !== null) {
            throw error
        }

    }

    showErrorMessage(message: string) {
        this.notification.error('Error', message);
    }

}
