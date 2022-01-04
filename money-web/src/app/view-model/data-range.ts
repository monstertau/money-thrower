import {TransactionView} from "./transactions";
import {Constant} from "../util/constant";
import * as moment from "moment";

export class DataRange {
    startDate!: Date;
    endDate!: Date;
    dataUnits: DataUnit[] = [];
    totalIncome: number = 0;
    totalOutcome: number = 0;
    totalDebt: number = 0;
    totalLoan: number = 0;
    otherInflow: number = 0;
    otherOutflow: number = 0;
    dailyIncome: number = 0;
    dailyOutcome: number = 0;

    constructor(title: string, start: Date, end: Date, allTransaction: TransactionView[]) {
        this.startDate = start;
        this.endDate = end;
        switch (title) {
            case Constant.THIS_MONTH:
                this.getMonthDataUnits();
                break;
            case Constant.LAST_MONTH:
                this.getMonthDataUnits();
                break;
            case Constant.LAST_3_MONTH:
                this.getYearDataUnits();
                break;
            case Constant.LAST_6_MONTH:
                this.getYearDataUnits();
                break;
            case Constant.THIS_YEAR:
                this.getYearDataUnits();
                break;
            case Constant.LAST_YEAR:
                this.getYearDataUnits();
                break;
            default:
                const days = moment(this.endDate).diff(moment(this.startDate), 'days')
                this.getCustomDataUnits(days);
                break;
        }
        this.addTransactions(allTransaction)

    }

    getYearDataUnits() {
        const year = this.endDate.getFullYear() - this.startDate.getFullYear()
        const numMonth = this.endDate.getMonth() + 12 * year - this.startDate.getMonth() + 1
        console.log(numMonth)
        for (let i = 0; i < numMonth; i++) {
            let dataUnit: DataUnit = {
                name: (this.startDate.getMonth() + i + 1).toString(),
                startDate: moment(this.startDate).add(i, 'month').toDate(),
                endDate: moment(this.startDate).add(i + 1, 'month').subtract(1, 'day').toDate(),
                incomeTransaction: [],
                outcomeTransaction: [],
                totalIncome: 0,
                totalOutcome: 0,
                incomeList: [],
                outcomeList: [],
                debtTransaction: [],
                loanTransaction: [],
                otherTransaction: [],
                totalDebt: 0,
                totalLoan: 0,
                otherInflow: 0,
                otherOutflow: 0,
                dailyTransaction: []
            }
            this.dataUnits.push(dataUnit);
        }
    }

    getMonthDataUnits() {
        const numDays = this.endDate.getDate() - this.startDate.getDate() + 1
        for (let i = 0; i < numDays; i++) {

            let dataUnit: DataUnit = {
                name: (this.startDate.getDate() + i).toString(),
                startDate: moment(this.startDate).add(i, 'day').toDate(),
                endDate: moment(this.startDate).add(i + 1, 'day').subtract(1, 'second').toDate(),
                incomeTransaction: [],
                outcomeTransaction: [],
                totalIncome: 0,
                totalOutcome: 0,
                incomeList: [],
                outcomeList: [],
                debtTransaction: [],
                loanTransaction: [],
                otherTransaction: [],
                totalDebt: 0,
                totalLoan: 0,
                otherInflow: 0,
                otherOutflow: 0,
                dailyTransaction: []
            }
            this.dataUnits.push(dataUnit);
        }
    }

    getCustomDataUnits(numInterval: number) {
        for (let i = 0; i < numInterval; i++) {
            let dataUnit: DataUnit = {
                name: (this.startDate.getDate() + i).toString(),
                startDate: moment(this.startDate).add(i, 'day').toDate(),
                endDate: moment(this.startDate).add(i + 1, 'day').subtract(1, 'second').toDate(),
                incomeTransaction: [],
                outcomeTransaction: [],
                totalIncome: 0,
                totalOutcome: 0,
                incomeList: [],
                outcomeList: [],
                debtTransaction: [],
                loanTransaction: [],
                otherTransaction: [],
                totalDebt: 0,
                totalLoan: 0,
                otherInflow: 0,
                otherOutflow: 0,
                dailyTransaction: []
            }
            this.dataUnits.push(dataUnit);
        }
    }

    addTransactions(transactions: TransactionView[]) {
        for (let transaction of transactions) {
            for (let dataUnit of this.dataUnits) {
                if (transaction.transactionDate.valueOf() >= dataUnit.startDate.valueOf() &&
                    transaction.transactionDate.valueOf() <= dataUnit.endDate.valueOf()) {
                    if (transaction.category.isExpense) {

                        dataUnit.dailyTransaction.push(transaction);
                        dataUnit.outcomeTransaction.push(transaction);
                        dataUnit.totalOutcome += transaction.amount;
                        this.totalOutcome += transaction.amount;
                        let dataPoint = {
                            icon: `assets/catalogs/${transaction.category.icon}.png`,
                            value: transaction.amount,
                            name: transaction.category.name,
                            type: transaction.category.type
                        }
                        dataUnit.outcomeList.push(dataPoint);
                    } else {
                        dataUnit.dailyTransaction.push(transaction);
                        dataUnit.incomeTransaction.push(transaction);
                        dataUnit.totalIncome += transaction.amount;
                        this.totalIncome += transaction.amount;
                        let dataPoint = {
                            name: transaction.category.name,
                            value: transaction.amount,
                            icon: `assets/catalogs/${transaction.category.icon}.png`,
                            type: transaction.category.type
                        }
                        dataUnit.incomeList.push(dataPoint);
                    }
                    if (transaction.category.type == "debt/loan" && !transaction.category.isExpense) {
                        dataUnit.debtTransaction.push(transaction);
                        dataUnit.totalDebt += transaction.amount;
                        this.totalDebt += transaction.amount;
                    }
                    if (transaction.category.type == "debt/loan" && transaction.category.isExpense) {
                        dataUnit.loanTransaction.push(transaction);
                        dataUnit.totalLoan += transaction.amount;
                        this.totalLoan += transaction.amount;
                    }
                    if (transaction.category.type != "debt/loan" && !transaction.category.isExpense) {
                        dataUnit.otherTransaction.push(transaction);
                        dataUnit.otherInflow += transaction.amount;
                        this.otherInflow += transaction.amount;
                    }
                    if (transaction.category.type != "debt/loan" && transaction.category.isExpense) {
                        dataUnit.otherTransaction.push(transaction);
                        dataUnit.otherOutflow += transaction.amount;
                        this.otherOutflow += transaction.amount;
                    }
                }
            }
        }
    }
}

export interface DataUnit {
    name: string
    startDate: Date;
    endDate: Date;
    incomeTransaction: TransactionView[];
    outcomeTransaction: TransactionView[];
    totalIncome: number;
    totalOutcome: number;
    incomeList: DataPoint[];
    outcomeList: DataPoint[];
    debtTransaction: TransactionView[];
    loanTransaction: TransactionView[];
    otherTransaction: TransactionView[];
    totalDebt: number;
    totalLoan: number;
    otherInflow: number;
    otherOutflow: number;
    dailyTransaction: TransactionView[];
}

export interface DataPoint {
    name: string;
    value: number;
    icon: string;
    type: string
}
