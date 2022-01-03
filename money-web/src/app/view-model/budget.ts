import {Category, CategoryView} from "./category";
import {WalletView} from "./wallet";
import {Wallet} from "../services/wallet.service";
import {Transaction2} from "../services/transaction.service";

export interface Budget {
    id: string;
    wallet_id: string;
    cat_id: string;
    amount: number;
    spent_amount: number;
    user_id: string;
    status: number;
    start_date: number;
    end_date: number;
}

export class BudgetView {
    id: string;
    wallet: WalletView;
    category: CategoryView;
    amount: number;
    spentAmount: number;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: number;

    constructor() {
        this.id = "";
        this.wallet = new WalletView();
        this.amount = 0;
        this.spentAmount = 0;
        this.userId = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.category = new CategoryView()
        this.status = 0;
    }

    addBudget(budget: Budget): BudgetView {
        this.id = budget.id;
        this.amount = budget.amount;
        this.spentAmount = budget.spent_amount;
        this.userId = budget.user_id;
        this.startDate = new Date(budget.start_date);
        this.endDate = new Date(budget.end_date);
        this.status = budget.status;
        return this;
    }

    addCategory(category: Category): BudgetView {
        this.category.addCategory(category)
        return this;
    }

    addWallet(wallet: Wallet): BudgetView {
        this.wallet.addWallet(wallet)
        return this;
    }

    addWalletView(walletView: WalletView): BudgetView {
        this.wallet = walletView;
        return this;
    }

    toBudget(): Budget {
        return {
            id: this.id,
            user_id: this.userId,
            wallet_id: this.wallet.id,
            cat_id: this.category.id,
            amount: this.amount,
            spent_amount: this.spentAmount,
            start_date: this.startDate.getTime(),
            end_date: this.endDate.getTime(),
            status: this.status
        }
    }
}
