import { Component, OnDestroy, OnInit, inject } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { CurrencyPipe, DatePipe } from "@angular/common"
import { Account } from "../account.model"
import { AccountsService } from "../account.service"
import { Subscription } from "rxjs"
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component"

@Component({
    selector: "app-account-list",
    imports: [MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe, DatePipe],
    templateUrl: "./account-list.component.html",
    styleUrl: "./account-list.component.scss",
})
export class AccountListComponent implements OnInit, OnDestroy {
    accounts: Account[] = []
    accountsSubscription!: Subscription
    readonly deleteDialog = inject(MatDialog)

    constructor(public accountsService: AccountsService) {}

    ngOnInit(): void {
        this.accountsService.getAccounts()
        this.accountsSubscription = this.accountsService
            .getAccountsUpdateListener()
            .subscribe((accounts: Account[]) => {
                this.accounts = accounts
            })
    }

    ngOnDestroy(): void {
        this.accountsSubscription.unsubscribe()
    }

    openDeleteDialog(account: Account) {
        const dialogRef = this.deleteDialog.open(DeleteDialogComponent, { data: account })
    }
}
