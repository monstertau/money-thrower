import {Component, Input, OnInit} from '@angular/core';
import {multi} from './data';
import { TransactionService, Transaction2, TransactionFilter } from 'src/app/services/transaction.service';
import { CommonService } from 'src/app/services/common.service';
import { TransactionView } from '../../view-model/transactions';
import { CategoryService } from '../../services/category.service';
import { WalletService } from '../../services/wallet.service';



@Component({
    selector: 'app-outcome-pie-chart',
    templateUrl: './outcome-pie-chart.component.html',
    styleUrls: ['./outcome-pie-chart.component.css']
})
export class OutcomePieChartComponent implements OnInit {

    test = {};
    tmp= {};

    multi!: any[];
    @Input() view?: any[];
    // options
    animations: boolean = true;
    colorScheme = {
        domain: ['#597C2B', '#668D2E', '#80A142', '#91B247', '#D2E459']
      };

    transactions: TransactionView[] = [];
    currentWalletId!: string;
    filter: TransactionFilter = {
        cat_id: '',
        wallet_id: '',
        end_amount: 0,
        start_amount: 0,
        start_date: 0,
        end_date: 0,
        key_note: '',
    };

    constructor(private transactionService: TransactionService, private categoryService: CategoryService, private walletService: WalletService, private commonService: CommonService) {     
        this.commonService.currentWallet.subscribe(wallet => { this.currentWalletId = wallet; });
        this.filter.wallet_id = this.currentWalletId;

        this.test = {
            "name" : "cba",
            "value" : 2000
        };
  
        Object.assign(this, {multi});
       
        // while(this.multi.length>0){
        //     this.multi.pop();
        // }

        this.filter.cat_id = '';
        this.filter.start_date = 0;
        this.filter.end_date = 0;

        // this.transactionService.getTransactions(this.filter).subscribe(transactions => {
        //     transactions.forEach(transaction => {
        //         this.tmp = {
        //             "name": transaction.cat_id,
        //             "value": transaction.amount
        //         };
        //         this.multi.push(this.tmp); 
        //     })
        //   }, (err) => {
        //     console.log(err)
        //   }
        // );
        // for(let i=0; i<9; i++){
        //     this.test = {
        //         "name" : i.toString(),
        //         "value": i*1000
        //     };

        //     this.multi.push(this.test);

        // }

        // console.log(this.multi);

    }

    ngOnInit(): void {
    }

    


    


}
