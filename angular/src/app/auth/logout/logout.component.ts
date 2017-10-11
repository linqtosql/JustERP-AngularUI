import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AppAuthService } from '@shared/auth/app-auth.service';
import { Helpers } from "@shared/helpers";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
        private _authService: AppAuthService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this._authService.logout();
    }
}