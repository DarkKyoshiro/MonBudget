import { Component, OnDestroy, OnInit } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatExpansionModule } from "@angular/material/expansion"
import { CurrencyPipe } from "@angular/common"
import { Account } from "../account.model"
import { AccountsService } from "../account.service"
import { Subscription } from "rxjs"

@Component({
    selector: "app-account-list",
    imports: [MatCardModule, MatIconModule, MatExpansionModule, CurrencyPipe],
    templateUrl: "./account-list.component.html",
    styleUrl: "./account-list.component.scss",
})
export class AccountListComponent implements OnInit, OnDestroy {
    accounts: Account[] = []
    accountsSubscription!: Subscription

    constructor(public accountsService: AccountsService) {}

    ngOnInit(): void {
        this.accounts = this.accountsService.getAccounts()
        this.accountsSubscription = this.accountsService
            .getAccountsUpdateListener()
            .subscribe((accounts: Account[]) => {
                this.accounts = accounts
            })
    }

    ngOnDestroy(): void {
        this.accountsSubscription.unsubscribe()
    }
}
