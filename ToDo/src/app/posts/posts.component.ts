import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { Post } from '../shared/post.model';

@Component({
	selector: 'posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
	@Output() posts: Post[];
	@Output() userId: string;

	userSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe((user) => {
			if (!user) {
                this.userId = '';
			    this.posts = [];
				return;
            }
            
			this.userId = user.id;
			this.posts = user.posts;
		});
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}
}
