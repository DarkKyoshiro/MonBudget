import { Component } from "@angular/core"
import { FormsModule, NgForm } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatSelectModule } from "@angular/material/select"
import { Account } from "../account.model"
import { AccountsService } from "../account.service"

@Component({
    selector: "app-account-create",
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
    ],
    templateUrl: "./account-create.component.html",
    styleUrl: "./account-create.component.scss",
})
export class AccountCreateComponent {
    constructor(public accountsService: AccountsService) {}

    onAddAccount(form: NgForm) {
        if (form.invalid) {
            return
        }
        this.accountsService.addAccount(form.value.accountName, form.value.type, form.value.balance)
    }
}
