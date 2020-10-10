import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	isLoggedIn = false;
	userSubscription: Subscription;
	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.userSubscription = this.authService.user.subscribe((user) => {
			this.isLoggedIn = !!user;
		});
	}
	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		if (this.userSubscription) {
			this.userSubscription.unsubscribe();
		}
	}
}
