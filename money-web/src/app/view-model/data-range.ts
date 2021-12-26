import {TransactionView} from "./transactions";

export class DataRange {
    startDate!: Date;
    endDate!: Date;
    dataUnits!: DataUnit[];

    constructor(start: Date, end: Date, allTransaction: TransactionView[]) {
        this.startDate = start;
        this.endDate = end;
    }

    getYearDataUnits() {
    }

    getMonthDataUnits() {

    }

    getQuarterDataUnits() {

    }

    getWeekDataUnits() {

    }

    getCustomDataUnits() {

    }
}

export interface DataUnit {
    date: Date;
    incomeTransaction: TransactionView[];
    outcomeTransaction: TransactionView[];
    total: number;
}
