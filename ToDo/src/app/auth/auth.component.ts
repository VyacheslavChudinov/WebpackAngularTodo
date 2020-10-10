import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription, Observable, throwError } from 'rxjs';
import { User } from '../shared/user.model';

@Component({
	selector: 'auth-component',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
	@ViewChild('authForm') authForm: NgForm;
	userSubscription: Subscription;
	userObservable: Observable<User>;
	isLoginFlow: boolean = false;
	isPasswordHidden = true;
	error: string;

	constructor(private authService: AuthService, private router: Router) {}
	ngOnInit() {
		this.isLoginFlow = this.router.url === '/login';
	}

	onSubmit() {
		const user = {
			username: this.authForm.form.get('username').value,
			password: this.authForm.form.get('password').value,
		};

		this.userObservable = this.isLoginFlow
			? this.authService.authenticate(user)
			: this.authService.register(user);

		this.userSubscription = this.userObservable.subscribe(
			() => {
				this.router.navigate(['/posts']);
			},
			(err) => {
				if (err && err.error) {
					this.error = err.error.message;
				}
			}
		);
	}

	ngOnDestroy() {
		if (this.userSubscription) {
			this.userSubscription.unsubscribe();
		}
	}
}
