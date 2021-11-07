import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ɵangular_packages_platform_browser_platform_browser_d} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from 'src/app/services/auth.service';
import {DropDownList} from './model';
import {WalletService} from "../../services/wallet.service";


@Component({
    selector: 'app-wallet-add',
    templateUrl: './wallet-add.component.html',
    styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {
    form!: FormGroup;
    isAddForm = true;
    isEditForm = false;
    isLoading = false;

    constructor(private fb: FormBuilder, private walletService: WalletService, private notification: NzNotificationService) {
    }

    get f() {
        return this.form.controls;
    }

    selectWalletType() {
        let walletType = document.getElementsByClassName('wallet-type') as HTMLCollectionOf<HTMLElement>;
        let walletDetail = document.getElementsByClassName('wallet-detail') as HTMLCollectionOf<HTMLElement>;
        let saveButton = document.getElementsByClassName('save-btn') as HTMLCollectionOf<HTMLElement>
        if (walletDetail.length != 0 && walletType.length != 0 && walletType[0].hidden) {
            walletType[0].hidden = false;
            walletDetail[0].hidden = true;
            saveButton[0].hidden = true;
        }
    }

    showDetail(value: number) {
        let walletType = document.getElementsByClassName('wallet-type') as HTMLCollectionOf<HTMLElement>;
        let walletDetail = document.getElementsByClassName('wallet-detail') as HTMLCollectionOf<HTMLElement>;
        let saveButton = document.getElementsByClassName('save-btn') as HTMLCollectionOf<HTMLElement>
        if (walletDetail.length != 0 && walletType.length != 0 && walletDetail[0].hidden) {
            walletType[0].hidden = true;
            walletDetail[0].hidden = false;
            saveButton[0].hidden = false;
            this.form.patchValue({type: value})
        }
    }

    returnMyWallet() {
        window.location.href = '/my-wallets'
    }

    submitAddWallet() {
        console.log(this.form.value);
        this.isLoading = true;
        var wallet = this.form.value;
        if (this.form.controls.name.value == null)
            this.notification.error('Error', "Please input your wallet name");
        else {
            this.walletService.addWallet(wallet).subscribe(result => {
                if (result == 'SUCCESS') {
                    this.notification.success('Success', 'Add Wallet Success');
                    setTimeout(() => {
                        window.location.href = '/my-wallets';
                    }, 1000);
                } else {
                    this.notification.error('Error', 'Add Wallet Fail');
                }
            }, (message) => {
                this.isLoading = false;
                console.log(message)
            });
        }
    }

    formatterCurrency = (value: number): string => `${this.form.value.currency} ${value}`;

    parserAmount = (value: string): string => value.replace(`${this.form.value.currency} `, '');

    ngOnInit(): void {
        this.form = this.fb.group({
            balance: [0, [Validators.required]],
            currency: ['USD', [Validators.required]],
            icon: ['mua_sam', [Validators.required]],
            id: ['1'],
            name: [null, [Validators.required]],
            type: [null, [Validators.required]],
        });
    }

    CurrencyList: DropDownList[] = [
        {code: "AFN", text: "Afghanistan Afghanis – AFN"},
        {code: "ALL", text: "Albania Leke – ALL"},
        {code: "DZD", text: "Algeria Dinars – DZD"},
        {code: "ARS", text: "Argentina Pesos – ARS"},
        {code: "AUD", text: "Australia Dollars – AUD"},
        {code: "ATS", text: "Austria Schillings – ATS"},
        {code: "BSD", text: "Bahamas Dollars – BSD"},
        {code: "BHD", text: "Bahrain Dinars – BHD"},
        {code: "BDT", text: "Bangladesh Taka – BDT"},
        {code: "BBD", text: "Barbados Dollars – BBD"},
        {code: "BEF", text: "Belgium Francs – BEF"},
        {code: "BMD", text: "Bermuda Dollars – BMD"},
        {code: "BRL", text: "Brazil Reais – BRL"},
        {code: "BGN", text: "Bulgaria Leva – BGN"},
        {code: "CAD", text: "Canada Dollars – CAD"},
        {code: "XOF", text: "CFA BCEAO Francs – XOF"},
        {code: "XAF", text: "CFA BEAC Francs – XAF"},
        {code: "CLP", text: "Chile Pesos – CLP"},
        {code: "CNY", text: "China Yuan Renminbi – CNY"},
        {code: "COP", text: "Colombia Pesos – COP"},
        {code: "XPF", text: "CFP Francs – XPF"},
        {code: "CRC", text: "Costa Rica Colones – CRC"},
        {code: "HRK", text: "Croatia Kuna – HRK"},
        {code: "CYP", text: "Cyprus Pounds – CYP"},
        {code: "CZK", text: "Czech Republic Koruny – CZK"},
        {code: "DKK", text: "Denmark Kroner – DKK"},
        {code: "DEM", text: "Deutsche (Germany) Marks – DEM"},
        {code: "DOP", text: "Dominican Republic Pesos – DOP"},
        {code: "NLG", text: "Dutch (Netherlands) Guilders - NLG"},
        {code: "XCD", text: "Eastern Caribbean Dollars – XCD"},
        {code: "EGP", text: "Egypt Pounds – EGP"},
        {code: "EEK", text: "Estonia Krooni – EEK"},
        {code: "EUR", text: "Euro – EUR"},
        {code: "FJD", text: "Fiji Dollars – FJD"},
        {code: "FIM", text: "Finland Markkaa – FIM"},
        {code: "FRF", text: "France Francs – FRF"},
        {code: "DEM", text: "Germany Deutsche Marks – DEM"},
        {code: "XAU", text: "Gold Ounces – XAU"},
        {code: "GRD", text: "Greece Drachmae – GRD"},
        {code: "GTQ", text: "Guatemalan Quetzal – GTQ"},
        {code: "NLG", text: "Holland (Netherlands) Guilders – NLG"},
        {code: "HKD", text: "Hong Kong Dollars – HKD"},
        {code: "HUF", text: "Hungary Forint – HUF"},
        {code: "ISK", text: "Iceland Kronur – ISK"},
        {code: "XDR", text: "IMF Special Drawing Right – XDR"},
        {code: "INR", text: "India Rupees – INR"},
        {code: "IDR", text: "Indonesia Rupiahs – IDR"},
        {code: "IRR", text: "Iran Rials – IRR"},
        {code: "IQD", text: "Iraq Dinars – IQD"},
        {code: "IEP", text: "Ireland Pounds – IEP"},
        {code: "ILS", text: "Israel New Shekels – ILS"},
        {code: "ITL", text: "Italy Lire – ITL"},
        {code: "JMD", text: "Jamaica Dollars – JMD"},
        {code: "JPY", text: "Japan Yen – JPY"},
        {code: "JOD", text: "Jordan Dinars – JOD"},
        {code: "KES", text: "Kenya Shillings – KES"},
        {code: "KRW", text: "Korea (South) Won – KRW"},
        {code: "KWD", text: "Kuwait Dinars – KWD"},
        {code: "LBP", text: "Lebanon Pounds – LBP"},
        {code: "LUF", text: "Luxembourg Francs – LUF"},
        {code: "MYR", text: "Malaysia Ringgits – MYR"},
        {code: "MTL", text: "Malta Liri – MTL"},
        {code: "MUR", text: "Mauritius Rupees – MUR"},
        {code: "MXN", text: "Mexico Pesos – MXN"},
        {code: "MAD", text: "Morocco Dirhams – MAD"},
        {code: "NLG", text: "Netherlands Guilders – NLG"},
        {code: "NZD", text: "New Zealand Dollars – NZD"},
        {code: "NOK", text: "Norway Kroner – NOK"},
        {code: "OMR", text: "Oman Rials – OMR"},
        {code: "PKR", text: "Pakistan Rupees – PKR"},
        {code: "XPD", text: "Palladium Ounces – XPD"},
        {code: "PEN", text: "Peru Nuevos Soles – PEN"},
        {code: "PHP", text: "Philippines Pesos – PHP"},
        {code: "XPT", text: "Platinum Ounces – XPT"},
        {code: "PLN", text: "Poland Zlotych – PLN"},
        {code: "PTE", text: "Portugal Escudos – PTE"},
        {code: "QAR", text: "Qatar Riyals – QAR"},
        {code: "RON", text: "Romania New Lei – RON"},
        {code: "ROL", text: "Romania Lei – ROL"},
        {code: "RUB", text: "Russia Rubles – RUB"},
        {code: "SAR", text: "Saudi Arabia Riyals – SAR"},
        {code: "XAG", text: "Silver Ounces – XAG"},
        {code: "SGD", text: "Singapore Dollars – SGD"},
        {code: "SKK", text: "Slovakia Koruny – SKK"},
        {code: "SIT", text: "Slovenia Tolars – SIT"},
        {code: "ZAR", text: "South Africa Rand – ZAR"},
        {code: "KRW", text: "South Korea Won – KRW"},
        {code: "ESP", text: "Spain Pesetas – ESP"},
        {code: "XDR", text: "Special Drawing Rights (IMF) – XDR"},
        {code: "LKR", text: "Sri Lanka Rupees – LKR"},
        {code: "SDD", text: "Sudan Dinars – SDD"},
        {code: "SEK", text: "Sweden Kronor – SEK"},
        {code: "CHF", text: "Switzerland Francs – CHF"},
        {code: "TWD", text: "Taiwan New Dollars – TWD"},
        {code: "THB", text: "Thailand Baht – THB"},
        {code: "TTD", text: "Trinidad and Tobago Dollars – TTD"},
        {code: "TND", text: "Tunisia Dinars – TND"},
        {code: "TRY", text: "Turkey New Lira – TRY"},
        {code: "AED", text: "United Arab Emirates Dirhams – AED"},
        {code: "GBP", text: "United Kingdom Pounds – GBP"},
        {code: "USD", text: "United States Dollars – USD"},
        {code: "VEB", text: "Venezuela Bolivares – VEB"},
        {code: "VND", text: "Vietnam Dong – VND"},
        {code: "ZMK", text: "Zambia Kwacha – ZMK"},
    ]

}
