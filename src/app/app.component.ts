import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { AccountCreateComponent } from "./accounts/account-create/account-create.component"
import { HeaderComponent } from "./header/header.component"
import { AccountListComponent } from "./accounts/account-list/account-list.component"

@Component({
    selector: "app-root",
    imports: [RouterOutlet, AccountCreateComponent, AccountListComponent, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "Mon Budget !"
}
