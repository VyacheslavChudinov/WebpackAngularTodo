import { AuthenticateRequest, AuthConstants } from '../shared/auth.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { Post } from '../shared/post.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly baseURL: string = 'http://localhost:4000';
	private readonly authEndpoint: string = '/users';
	public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any = null;

	constructor(private http: HttpClient, private router: Router) {}

	private handleAuthentication(user: User) {
		this.user.next(user);
		localStorage.setItem(AuthConstants.StoredUser, JSON.stringify(user));
	}

	authenticate(userData: AuthenticateRequest) {
		return this.http
			.post<User>(
				`${this.baseURL}${this.authEndpoint}/authenticate`,
				userData
			)
			.pipe(
				tap((user: User) => {
					this.handleAuthentication(user);
				})
			);
	}

	register(userData: AuthenticateRequest) {
		return this.http
			.post(`${this.baseURL}${this.authEndpoint}/register`, userData)
			.pipe(
				tap((user: User) => {
					return this.handleAuthentication(user);
				})
			);
	}

	logout() {
		this.user.next(null);
		this.router.navigate(['/login']);
		localStorage.removeItem(AuthConstants.StoredUser);

		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogin() {
		const userData: User = JSON.parse(
			localStorage.getItem(AuthConstants.StoredUser)
		);

		if (!userData) {
			return;
		}

		if (userData.token) {
			this.user.next(userData);
			const expirationDuration =
				new Date(userData.tokenExpirationDate).getTime() -
				new Date().getTime();
			this.autoLogout(expirationDuration);
			this.router.navigate(['/posts']);
		}
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	addPost(userId: string, post: Post) {
		return this.http
			.post<User>(
				`${this.baseURL}${this.authEndpoint}/${userId}/post`,
				post
			)
			.pipe(
				tap((user) => {
					return this.handleAuthentication(user);
				})
			);
	}

	updatePost(userdId: string, updatedPost: Post) {
		return this.http
			.put<User>(
				`${this.baseURL}${this.authEndpoint}/${userdId}/post`,
				updatedPost
			)
			.pipe(
				tap((user) => {
					return this.handleAuthentication(user);
				})
			);
	}

	deletePost(userdId: string, postId: string) {
		return this.http
			.delete<User>(
				`${this.baseURL}${this.authEndpoint}/${userdId}/post/${postId}`
			)
			.pipe(
				tap((user) => {
					return this.handleAuthentication(user);
				})
			);
	}

	getById(id: string) {
		return this.http.get<User>(`${this.baseURL}${this.authEndpoint}/${id}`);
	}
}
