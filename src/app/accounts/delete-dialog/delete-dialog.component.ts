import { Component, Inject } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { Account } from "../account.model"
import { AccountsService } from "../account.service"

@Component({
    selector: "app-delete-dialog",
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
    templateUrl: "./delete-dialog.component.html",
    styleUrl: "./delete-dialog.component.scss",
})
export class DeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Account,
        private accountsService: AccountsService
    ) {}

    confirmDeletion() {
        this.accountsService.deleteAccount(this.data.id)
        this.dialogRef.close("Deleted!")
    }

    closeDialog() {
        this.dialogRef.close("Canceled!")
    }
}
