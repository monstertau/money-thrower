import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DropDownList} from './model';
import {WalletService} from "../services/wallet.service";
import {WalletView} from "../view-model/wallet";


@Component({
    selector: 'app-wallet-add',
    templateUrl: './wallet-add.component.html',
    styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {
    @Input() wallet!: WalletView;

    constructor(private walletService: WalletService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
    }

    onChangeWalletName(value: string): void {
        this.wallet.name = value;
    }

    onAddCurrency(): void {
        console.log("onAddCurrency works")

    }
    onAddIcon(): void{
        console.log("onAddIcon works")
    }

    getCurrencyName(code: string): string {
        for (let curItem of this.CurrencyList) {
            if (curItem.code === code) {
                return curItem.text;
            }
        }
        return "";
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
