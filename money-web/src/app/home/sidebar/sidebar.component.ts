import {Component, EventEmitter, OnInit, Output, AfterViewInit} from '@angular/core';
import {CommonService} from 'src/app/services/common.service';
import {AuthService} from 'src/app/services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    @Output() collapse = new EventEmitter<boolean>();

    LogoutLoading: boolean = false;

    showLogoutModal: boolean = false;

    selectedItem = '';

    constructor(private commonService: CommonService, private router: Router, private authService: AuthService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.collapse.emit(false);
    }

    ngAfterViewInit(): void {
        this.selectItem();
    }

    isCollapsed = false;

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
        this.collapse.emit(this.isCollapsed);
        this.commonService.changeSizebarCollapsed(this.isCollapsed);
    }

    selectPage() {
        // this.commonService.reloadComponent();
        this.removeSelectedItem();
        window.location.reload();
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

    selectItem() {
        this.selectedItem = this.router.url.split('?')[0].replace("/", '') || 'transaction';
        let id = '';
        if (this.selectedItem === 'transaction' || this.selectedItem === '') {
            id = 'transaction';
        } else id = this.selectedItem;
        let selectedElement = document.getElementById(id) as HTMLElement;
        this.removeSelectedItem();
        if (!selectedElement.classList.contains('ant-menu-item-selected')) {
            console.log('here');
            selectedElement.classList.add('ant-menu-item-selected');
        }
    }

    removeSelectedItem() {
        let elements = document.getElementsByClassName('ant-menu-item') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('ant-menu-item-selected')) {
                elements[i].classList.remove('ant-menu-item-selected');
            }
        }
    }

}
