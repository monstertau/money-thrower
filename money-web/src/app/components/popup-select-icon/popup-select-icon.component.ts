import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { DropDownList } from 'src/app/wallet-add/model';

@Component({
    selector: 'app-popup-select-icon',
    templateUrl: './popup-select-icon.component.html',
    styleUrls: ['./popup-select-icon.component.css']
})
export class PopupSelectIconComponent implements OnInit {
    @Input() choseIcon!: string;
    @Input() callbackFunc!: Function;
    constructor() {
    }

    ngOnInit(): void {
    }

    IconList: DropDownList[] = [
        {code: "an_uong", text: "an_uong"},
        {code: "an_uong-do_an", text: "an_uong-do_an"},
        {code: "an_uong-do_uong", text: "an_uong-do_uong"},
        {code: "ban_do", text: "ban_do"},
        {code: "bao_duong_lap_dat", text: "bao_duong_lap_dat"},
        {code: "borrow", text: "borrow"},
        {code: "chi_phi_khac", text: "chi_phi_khac"},
        {code: "di_lai", text: "di_lai"},
        {code: "di_lai-dich_vu", text: "di_lai-dich_vu"},
        {code: "di_lai-nhien_lieu", text: "di_lai-nhien_lieu"},
        {code: "du_lich", text: "du_lich"},
        {code: "giai_tri", text: "giai_tri"},
        {code: "hoc_tap", text: "hoc_tap"},
        {code: "hoc_tap-hoc_phi", text: "hoc_tap-hoc_phi"},
        {code: "hoc_tap-tai_lieu", text: "hoc_tap-tai_lieu"},
        {code: "lam_dep", text: "lam_dep"},
        {code: "loan", text: "loan"},
        {code: "null", text: "null"},
        {code: "qua_tang", text: "qua_tang"},
        {code: "quan_he", text: "quan_he"},
        {code: "return-borrow", text: "return-borrow"},
        {code: "return-loan", text: "return-loan"},
        {code: "rui_ro", text: "rui_ro"},
        {code: "shopping", text: "shopping"},
        {code: "shopping-dau_tu_tai_san", text: "shopping-dau_tu_tai_san"},
        {code: "shopping-do_dien_dien_tu", text: "shopping-do_dien_dien_tu"},
        {code: "shopping-do_gia_dung", text: "shopping-do_gia_dung"},
        {code: "shopping-khac", text: "shopping-khac"},
        {code: "shopping-my_pham", text: "shopping-my_pham"},
        {code: "shopping-trang_phuc_phu_kien", text: "shopping-trang_phuc_phu_kien"},
        {code: "sinh_hoat", text: "sinh_hoat"},
        {code: "sinh_hoat-dien_thoai", text: "sinh_hoat-dien_thoai"},
        {code: "sinh_hoat-gas", text: "sinh_hoat-gas"},
        {code: "sinh_hoat-nha_cua", text: "sinh_hoat-nha_cua"},
        {code: "sinh_hoat-tien_dien", text: "sinh_hoat-tien_dien"},
        {code: "sinh_hoat-tien_mang", text: "sinh_hoat-tien_mang"},
        {code: "sinh_hoat-tien_nuoc", text: "sinh_hoat-tien_nuoc"},
        {code: "sinh_hoat-tieu_dung", text: "sinh_hoat-tieu_dung"},
        {code: "sinh_hoat-truyen_hinh", text: "sinh_hoat-truyen_hinh"},
        {code: "sinh_hoat-vat_nuoi", text: "sinh_hoat-vat_nuoi"},
        {code: "so_du", text: "so_du"},
        {code: "suc_khoe", text: "suc_khoe"},
        {code: "suc_khoe-the_thao", text: "suc_khoe-the_thao"},
        {code: "thu_nhap", text: "thu_nhap"},
        {code: "thu_nhap_khac", text: "thu_nhap_khac"},
        {code: "thuong", text: "thuong"},
        {code: "tu_thien", text: "tu_thien"},
        {code: "wallet_icon", text: "wallet_icon"},
    ]

    iconPick(iconName: string) {
        this.choseIcon = iconName;

    }

}
