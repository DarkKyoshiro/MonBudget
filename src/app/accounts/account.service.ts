import { Injectable } from "@angular/core"
import { Account } from "./account.model"
import { map, Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"

@Injectable({ providedIn: "root" })
export class AccountsService {
    private accounts: Account[] = []
    private accountUpdated = new Subject<Account[]>()

    constructor(private http: HttpClient) {}

    getAccounts() {
        this.http
            .get<{ message: string; accounts: any[] }>("http://localhost:3000/api/accounts")
            .pipe(
                map((accountData) => {
                    return accountData.accounts.map((account) => {
                        return {
                            id: account._id,
                            accountName: account.accountName,
                            type: account.type,
                            balance: account.balance,
                            dateCreated: account.dateCreated,
                        }
                    })
                })
            )
            .subscribe((transformedAccounts) => {
                this.accounts = transformedAccounts
                this.accountUpdated.next([...this.accounts])
            })
    }

    getAccountsUpdateListener() {
        return this.accountUpdated.asObservable()
    }

    addAccount(accountName: string, type: string, balance: number) {
        const account: Account = {
            id: "",
            accountName: accountName,
            type: type,
            balance: balance,
            dateCreated: Date.now(),
        }
        this.http
            .post<{ message: string; accountID: string }>(
                "http://localhost:3000/api/accounts",
                account
            )
            .subscribe((responseData) => {
                console.log(responseData.message)
                const accountID = responseData.accountID
                account.id = accountID
                this.accounts.push({ ...account })
                this.accountUpdated.next([...this.accounts])
            })
    }

    deleteAccount(accountID: string) {
        this.http.delete("http://localhost:3000/api/accounts/" + accountID).subscribe(() => {
            const updatedAccounts = this.accounts.filter((account) => account.id !== accountID)
            this.accounts = updatedAccounts
            this.accountUpdated.next([...this.accounts])
        })
    }
}
