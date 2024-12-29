import { Injectable } from "@angular/core"
import { Account } from "./account.model"
import { Subject } from "rxjs"

@Injectable({ providedIn: "root" })
export class AccountsService {
    private accounts: Account[] = []
    private accountUpdated = new Subject<Account[]>()

    getAccounts() {
        return [...this.accounts]
    }

    getAccountsUpdateListener() {
        return this.accountUpdated.asObservable()
    }

    addAccount(name: string, type: string, balance: number) {
        const account: Account = { name: name, type: type, balance: balance }
        this.accounts.push({ ...account })
        this.accountUpdated.next([...this.accounts])
    }
}
